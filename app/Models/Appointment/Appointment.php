<?php

namespace App\Models\Appointment;

use App\Models\Medical\AnalysisResult;
use App\Models\Core\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'doctor_id',
        'time_slot_id',
        'appointment_type',
        'status',
        'reason',
        'notes',
        'symptoms',
        'analysis_result_id',
        'reminder_sent',
        'follow_up_required',
        'follow_up_date',
        'cancellation_reason',
    ];

    protected $casts = [
        'symptoms' => 'array',
        'reminder_sent' => 'boolean',
        'follow_up_required' => 'boolean',
        'follow_up_date' => 'datetime',
        'id' => 'int',
        'user_id' => 'int',
        'doctor_id' => 'int',
        'time_slot_id' => 'int',
        'analysis_result_id' => 'int',
    ];

    protected $graphQLType = 'Appointment';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }

    public function timeSlot()
    {
        return $this->belongsTo(TimeSlot::class);
    }

    public function analysisResult()
    {
        return $this->belongsTo(AnalysisResult::class);
    }

    public function getCanBeCancelledAttribute(): bool
    {
        return in_array($this->status, ['scheduled', 'confirmed']) &&
               $this->timeSlot->start_time->diffInHours(now()) >= 24;
    }

    public function getIsUpcomingAttribute(): bool
    {
        return $this->timeSlot->start_time->isFuture() &&
               in_array($this->status, ['scheduled', 'confirmed']);
    }

    public function getFormattedDateTimeAttribute(): string
    {
        return $this->timeSlot->start_time->format('M j, Y \a\t g:i A');
    }
}
