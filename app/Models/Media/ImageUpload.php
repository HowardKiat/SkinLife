<?php

namespace App\Models\Media;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ImageUpload extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'original_name',
        'file_path',
        'file_size',
        'mime_type',
        'dimensions',
        'hash',
        'is_processed',
        'metadata',
        'quality_score',
    ];

    protected $casts = [
        'dimensions' => 'array',
        'is_processed' => 'boolean',
        'metadata' => 'array',
        'quality_score' => 'decimal:2',
        'id' => 'int',
        'user_id' => 'int',
        'file_size' => 'int',
    ];

    protected $graphQLType = 'ImageUpload';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function analysisResult()
    {
        return $this->hasOne(AnalysisResult::class, 'image_id');
    }

    // GraphQL computed fields
    public function getFileSizeInMBAttribute(): float
    {
        return round($this->file_size / 1024 / 1024, 2);
    }

    public function getUrlAttribute(): string
    {
        return asset('storage/' . $this->file_path);
    }

    public function getThumbnailUrlAttribute(): string
    {
        $pathInfo = pathinfo($this->file_path);
        $thumbnailPath = $pathInfo['dirname'] . '/thumbs/' . $pathInfo['filename'] . '_thumb.' . $pathInfo['extension'];
        return asset('storage/' . $thumbnailPath);
    }

    public function getIsHighQualityAttribute(): bool
    {
        return $this->quality_score >= 0.8;
    }
}
