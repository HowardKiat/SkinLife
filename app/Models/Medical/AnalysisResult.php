<?php

namespace App\Models\Medical;

use App\Models\User_Management\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AnalysisResult extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'image_id',
        'condition_id',
        'confidence_score',
        'risk_level',
        'ai_explanation',
        'visual_markers',
        'alternative_conditions',
        'recommendations',
        'follow_up_required',
        'doctor_review_status',
        'processing_time',
        'model_version',
    ];

    protected $casts = [
        'confidence_score' => 'decimal:4',
        'visual_markers' => 'array',
        'alternative_conditions' => 'array',
        'recommendations' => 'array',
        'follow_up_required' => 'boolean',
        'processing_time' => 'decimal:3',
        'id' => 'int',
        'user_id' => 'int',
        'image_id' => 'int',
        'condition_id' => 'int',
    ];

    protected $graphQLType = 'AnalysisResult';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function image()
    {
        return $this->belongsTo(ImageUpload::class, 'image_id');
    }

    public function skinCondition()
    {
        return $this->belongsTo(SkinCondition::class, 'condition_id');
    }

    public function diagnosisHistory()
    {
        return $this->hasMany(DiagnosisHistory::class, 'analysis_id');
    }

    // GraphQL computed fields
    public function getIsHighRiskAttribute(): bool
    {
        return in_array($this->risk_level, ['high', 'urgent']);
    }

    public function getRequiresImmediateAttentionAttribute(): bool
    {
        return $this->risk_level === 'urgent';
    }

    public function getConfidencePercentageAttribute(): int
    {
        return (int)($this->confidence_score * 100);
    }

    public function getRiskColorAttribute(): string
    {
        return match($this->risk_level) {
            'low' => '#28a745',
            'medium' => '#ffc107',
            'high' => '#fd7e14',
            'urgent' => '#dc3545',
            default => '#6c757d'
        };
    }

    public function getHasDoctorReviewAttribute(): bool
    {
        return !is_null($this->doctor_review_status);
    }
}
