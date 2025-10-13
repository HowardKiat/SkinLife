<?php

namespace App\Models\Core;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'username',
        'phone',
        'date_of_birth',
        'gender',
        'address',
        'emergency_contact',
        'medical_history',
        'skin_type',
        'allergies',
        'preferences',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'medical_history' => 'array',
        'allergies' => 'array',
        'preferences' => 'array',
        'id' => 'int',
        'user_id' => 'int',
    ];

    protected $graphQLType = 'UserProfile';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getAgeAttribute(): ?int
    {
        return $this->date_of_birth ? \Carbon\Carbon::parse($this->date_of_birth)->diffInYears(now()) : null;
    }
}
