<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Core\User;

class AuthMutator
{
    public function login($root, array $args)
    {
        $user = User::where('email', $args['email'])->first();
        if (!$user || !Hash::check($args['password'], $user->password)) {
            throw new \Exception('Invalid credentials');
        }
        $token = $user->createToken('graphql-login')->plainTextToken;
        return [
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
        ];
    }

    public function register($root, array $args)
    {
        // Basic validation
        if ($args['password'] !== $args['password_confirmation']) {
            throw new \Exception('Passwords do not match');
        }
        if (User::where('email', $args['email'])->exists()) {
            throw new \Exception('Email already exists');
        }
        $user = User::create([
            'name' => $args['name'],
            'email' => $args['email'],
            'password' => Hash::make($args['password']),
        ]);
        $token = $user->createToken('graphql-register')->plainTextToken;
        return [
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
        ];
    }
}
