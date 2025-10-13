<?php

namespace App\Models\Appointment;

use App\Models\Core\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'clinic_id',
        'license_number',
        'specialization',
        'years_experience',
        'qualifications',
        'biography',
        'consultation_fee',
        'languages',
        'availability_status',
        'rating',
        'total_reviews',
        'next_available_slot',
    ];

    protected $casts = [
        'years_experience' => 'integer',
        'qualifications' => 'array',
        'consultation_fee' => 'decimal:2',
        'languages' => 'array',
        'rating' => 'decimal:2',
        'total_reviews' => 'integer',
        'next_available_slot' => 'datetime',
        'id' => 'int',
        'user_id' => 'int',
        'clinic_id' => 'int',
    ];

    protected $graphQLType = 'Doctor';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function clinic()
    {
        return $this->belongsTo(Clinic::class);
    }

    public function timeSlots()
    {
        return $this->hasMany(TimeSlot::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function diagnosisHistory()
    {
        return $this->hasMany(DiagnosisHistory::class);
    }

    // GraphQL computed fields
    public function getIsAvailableAttribute(): bool
    {
        return $this->availability_status === 'available';
    }

    public function getFullNameAttribute(): string
    {
        return $this->user->profile->full_name ?? '';
    }

    public function getCompletedAppointmentsCountAttribute(): int
    {
        return $this->appointments()->where('status', 'completed')->count();
    }

    public function getAverageRatingAttribute(): float
    {
        return $this->rating ?: 0.0;
    }
}
