<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Facility extends Model
{
    use HasFactory;
    
    protected $primaryKey = 'facility_id';      // Add this
    public $incrementing = false;               // Add this
    protected $keyType = 'string';              // Add this

    protected $fillable = [
        'facility_id',
        'facility_code',
        'name',
        'location',
        'description',
        'partner_organization',
        'facility_type',
        'capabilities',
    ];

    protected $casts = [
        'capabilities' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public const FACILITY_TYPES = ['Lab', 'Workshop', 'Testing Center'];

    /**
     * Get the services for this facility
     */
    public function services(): HasMany
    {
        return $this->hasMany(Service::class, 'facility_id', 'facility_id');
    }

    /**
     * Get the equipment for this facility
     */
    public function equipment(): HasMany
    {
        return $this->hasMany(Equipment::class, 'facility_id', 'facility_id');
    }

    /**
     * Get the projects for this facility
     */
    public function projects(): HasMany
    {
        return $this->hasMany(Project::class, 'facility_id', 'facility_id');
    }

    protected static function booted()
    {
        static::creating(function (Facility $facility) {
            // Generate facility_id if not set
            if (empty($facility->facility_id)) {
                $facility->facility_id = (string) Str::uuid();
            }
            
            // Generate facility_code if not set
            if (empty($facility->facility_code) && !empty($facility->name)) {
                $base = strtoupper(preg_replace('/[^A-Z0-9]+/i', '-', $facility->name));
                $base = trim($base, '-');
                $prefix = 'FAC-';
                $candidate = $prefix . substr($base, 0, 8);
                $i = 1;
                while (self::where('facility_code', $candidate)->exists()) {
                    $candidate = $prefix . substr($base, 0, 8) . '-' . $i++;
                }
                $facility->facility_code = $candidate;
            }
        });
    }
}