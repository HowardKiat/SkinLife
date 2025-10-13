<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Core\User;
use Illuminate\Support\Facades\Hash;

class GraphQLLoginTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_with_graphql_mutation_success()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => Hash::make('password123'),
        ]);

        $mutation = '
            mutation Login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                    access_token
                    token_type
                    user { id name email }
                }
            }
        ';

        $response = $this->postJson('/graphql', [
            'query' => $mutation,
            'variables' => [
                'email' => 'test@example.com',
                'password' => 'password123',
            ],
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.login.user.email', 'test@example.com')
            ->assertJsonStructure([
                'data' => [
                    'login' => [
                        'access_token',
                        'token_type',
                        'user' => [
                            'id', 'name', 'email'
                        ]
                    ]
                ]
            ]);
    }

    public function test_login_with_graphql_mutation_invalid_credentials()
    {
        $mutation = '
            mutation Login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                    access_token
                    token_type
                    user { id name email }
                }
            }
        ';

        $response = $this->postJson('/graphql', [
            'query' => $mutation,
            'variables' => [
                'email' => 'wrong@example.com',
                'password' => 'wrongpassword',
            ],
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'errors'
            ]);
    }
}
