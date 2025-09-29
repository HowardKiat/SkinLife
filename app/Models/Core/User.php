<?php

namespace App\Models\Core;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        'email',
        'password',
        'role_id',
        'is_active',
        'email_verified_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_active' => 'boolean',
        'id' => 'int',
        'role_id' => 'int',
    ];

    // GraphQL Type Hints
    protected $graphQLType = 'User';

    // Relationships
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function profile()
    {
        return $this->hasOne(UserProfile::class);
    }

    public function analysisResults()
    {
        return $this->hasMany(AnalysisResult::class);
    }

    public function imageUploads()
    {
        return $this->hasMany(ImageUpload::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function feedback()
    {
        return $this->hasMany(Feedback::class);
    }

    public function doctor()
    {
        return $this->hasOne(Doctor::class);
    }

    // GraphQL Resolvers - Helper methods
    public function isPatient(): bool
    {
        return $this->role->name === 'patient';
    }

    public function isDoctor(): bool
    {
        return $this->role->name === 'doctor';
    }

    public function isAdmin(): bool
    {
        return $this->role->name === 'admin';
    }

    public function isResearcher(): bool
    {
        return $this->role->name === 'researcher';
    }

    // GraphQL computed fields
    public function getFullNameAttribute(): ?string
    {
        return $this->profile ? $this->profile->full_name : null;
    }

    public function getTotalAnalysesAttribute(): int
    {
        return $this->analysisResults()->count();
    }
}
