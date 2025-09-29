<?php

namespace App\Models\Appointment;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clinic extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'city',
        'state',
        'postal_code',
        'country',
        'latitude',
        'longitude',
        'phone',
        'email',
        'website',
        'specialties',
        'operating_hours',
        'is_verified',
        'rating',
        'description',
        'total_reviews',
    ];

    protected $casts = [
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'specialties' => 'array',
        'operating_hours' => 'array',
        'is_verified' => 'boolean',
        'rating' => 'decimal:2',
        'total_reviews' => 'int',
        'id' => 'int',
    ];

    protected $graphQLType = 'Clinic';

    public function doctors()
    {
        return $this->hasMany(Doctor::class);
    }

    public function timeSlots()
    {
        return $this->hasMany(TimeSlot::class);
    }

    public function appointments()
    {
        return $this->hasManyThrough(Appointment::class, Doctor::class);
    }

    // GraphQL computed fields and resolvers
    public function getDistanceFrom(float $lat, float $lng): float
    {
        $earthRadius = 6371; // km

        $dLat = deg2rad($this->latitude - $lat);
        $dLng = deg2rad($this->longitude - $lng);

        $a = sin($dLat/2) * sin($dLat/2) +
             cos(deg2rad($lat)) * cos(deg2rad($this->latitude)) *
             sin($dLng/2) * sin($dLng/2);

        $c = 2 * atan2(sqrt($a), sqrt(1-$a));
        $distance = $earthRadius * $c;

        return round($distance, 2);
    }

    public function getFullAddressAttribute(): string
    {
        return implode(', ', array_filter([
            $this->address,
            $this->city,
            $this->state,
            $this->postal_code,
            $this->country
        ]));
    }

    public function getAvailableDoctorsCountAttribute(): int
    {
        return $this->doctors()->where('availability_status', 'available')->count();
    }

    public function getIsOpenNowAttribute(): bool
    {
        if (!$this->operating_hours) return false;

        $now = now();
        $dayOfWeek = strtolower($now->format('l'));
        $currentTime = $now->format('H:i');

        $todayHours = $this->operating_hours[$dayOfWeek] ?? null;

        if (!$todayHours || $todayHours === 'closed') return false;

        [$open, $close] = explode('-', $todayHours);

        return $currentTime >= $open && $currentTime <= $close;
    }
}
