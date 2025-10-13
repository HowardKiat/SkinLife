<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Core\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = ['Admin', 'Doctor', 'Patient', 'Researcher'];

        foreach ($roles as $role) {
            // Create role only if it doesn't exist
            Role::firstOrCreate(
                ['name' => $role],
                ['created_at' => now(), 'updated_at' => now()]
            );
        }
    }
}
