<?php

namespace App\GraphQL\Mutations;

use App\Models\Core\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Nuwave\Lighthouse\Exceptions\RendersErrorsExtensions;

class AuthResolver
{
    public function register($root, array $args)
    {
        $input = $args['input'];

        // 1. Validate input manually
        $validator = Validator::make($input, [
            'username' => 'required|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|confirmed',
            // Optional fields
            'phone' => 'nullable',
            'date_of_birth' => 'nullable|date',
            'gender' => 'nullable',
            'role_id' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        // 2. Create user
        $user = User::create([
            'username' => $input['username'],
            'email' => $input['email'],
            'phone' => $input['phone'] ?? null,
            'date_of_birth' => $input['date_of_birth'] ?? null,
            'gender' => $input['gender'] ?? null,
            'role_id' => $input['role_id'] ?? null,
            'password' => Hash::make($input['password']),
        ]);

        // 3. Create token
        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token,
        ];
    }

    public function login($root, array $args)
    {
        $user = User::where('email', $args['email'])->first();

        if (!$user || !Hash::check($args['password'], $user->password)) {
            throw new \Exception('Invalid credentials');
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token,
        ];
    }

    public function logout($root, array $args, $context)
    {
        $user = $context->user();
        if ($user) {
            $user->tokens()->delete();
            return true;
        }
        return false;
    }
}
