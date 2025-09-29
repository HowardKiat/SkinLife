<?php

namespace App\Models\Appointment;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimeSlot extends Model
{
    use HasFactory;

    protected $fillable = [
        'doctor_id',
        'clinic_id',
        'date',
        'start_time',
        'end_time',
        'is_available',
        'slot_type',
        'max_bookings',
        'current_bookings',
        'duration_minutes',
    ];

    protected $casts = [
        'date' => 'date',
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'is_available' => 'boolean',
        'max_bookings' => 'integer',
        'current_bookings' => 'integer',
        'duration_minutes' => 'integer',
        'id' => 'int',
        'doctor_id' => 'int',
        'clinic_id' => 'int',
    ];

    protected $graphQLType = 'TimeSlot';

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }

    public function clinic()
    {
        return $this->belongsTo(Clinic::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function getHasAvailableSlotsAttribute(): bool
    {
        return $this->current_bookings < $this->max_bookings && $this->is_available;
    }

    public function getRemainingCapacityAttribute(): int
    {
        return $this->max_bookings - $this->current_bookings;
    }

    public function getFormattedTimeAttribute(): string
    {
        return $this->start_time->format('H:i') . ' - ' . $this->end_time->format('H:i');
    }
}
