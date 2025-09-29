<?php

namespace App\Models\Medical;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SkinCondition extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'severity_level',
        'symptoms',
        'treatment_info',
        'prevention_tips',
        'when_to_see_doctor',
        'is_serious',
        'image_examples',
        'prevalence_data',
    ];

    protected $casts = [
        'symptoms' => 'array',
        'treatment_info' => 'array',
        'prevention_tips' => 'array',
        'when_to_see_doctor' => 'array',
        'is_serious' => 'boolean',
        'image_examples' => 'array',
        'prevalence_data' => 'array',
        'id' => 'int',
    ];

    protected $graphQLType = 'SkinCondition';

    public function analysisResults()
    {
        return $this->hasMany(AnalysisResult::class, 'condition_id');
    }

    public function educationalContent()
    {
        return $this->hasMany(EducationalContent::class, 'condition_id');
    }

    // GraphQL computed fields
    public function getAnalysisCountAttribute(): int
    {
        return $this->analysisResults()->count();
    }

    public function getSeverityColorAttribute(): string
    {
        return match($this->severity_level) {
            'low' => '#28a745',
            'medium' => '#ffc107',
            'high' => '#fd7e14',
            'urgent' => '#dc3545',
            default => '#6c757d'
        };
    }
}
