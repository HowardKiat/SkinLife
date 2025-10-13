<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Core\User;
use Illuminate\Support\Facades\Hash;
use App\Models\Core\Role;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Make sure roles exist
        $defaultRole = Role::firstOrCreate(['name' => 'Patient']);

        // Admin role
        $adminRole = Role::firstOrCreate(['name' => 'Admin']);

        // Create system admin if not exists
        User::firstOrCreate(
            ['email' => 'admin@skinlife.com'],
            [
                'username' => 'System Admin',
                'password' => Hash::make('password'),
                'role_id' => $adminRole->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        // Optionally, create a default patient user
        User::firstOrCreate(
            ['email' => 'patient@skinlife.com'],
            [
                'username' => 'Default Patient',
                'password' => Hash::make('password'),
                'role_id' => $defaultRole->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
    }
}
