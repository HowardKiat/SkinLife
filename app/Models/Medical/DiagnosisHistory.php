<?php

namespace App\Models\Medical;

use App\Models\User_Management\User;
use App\Models\Medical_Management\AnalysisResult;
use App\Models\Medical_Management\Doctor;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiagnosisHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'analysis_id',
        'doctor_id',
        'diagnosis',
        'doctor_notes',
        'treatment_plan',
        'follow_up_date',
        'status',
        'prescription',
        'accuracy_feedback',
    ];

    protected $casts = [
        'follow_up_date' => 'datetime',
        'treatment_plan' => 'array',
        'prescription' => 'array',
        'accuracy_feedback' => 'array',
        'id' => 'int',
        'user_id' => 'int',
        'analysis_id' => 'int',
        'doctor_id' => 'int',
    ];

    protected $graphQLType = 'DiagnosisHistory';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function analysisResult()
    {
        return $this->belongsTo(AnalysisResult::class, 'analysis_id');
    }

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }

    public function getIsCompletedAttribute(): bool
    {
        return $this->status === 'completed';
    }

    public function getRequiresFollowUpAttribute(): bool
    {
        return $this->follow_up_date && $this->follow_up_date->isFuture();
    }
}
