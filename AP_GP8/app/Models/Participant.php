<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     */
    protected $table = 'participants';

    /**
     * The primary key associated with the table.
     */
    protected $primaryKey = 'participant_id';

    /**
     * Indicates if the IDs are auto-incrementing.
     */
    public $incrementing = false;

    /**
     * The data type of the primary key.
     */
    protected $keyType = 'string';

    /**
     * Mass assignable attributes.
     */
    protected $fillable = [
        'participant_id',
        'full_name',
        'email',
        'affiliation',
        'specialization',
        'participant_type',
        'cross_skill_trained',
        'institution',
    ];

    /**
     * Attribute type casting.
     */
    protected $casts = [
        'cross_skill_trained' => 'boolean',
    ];

    /**
     * Use participant_id for route model binding.
     */
    public function getRouteKeyName()
    {
        return 'participant_id';
    }

    /**
     * Allowed enumerations.
     */
    public const AFFILIATIONS = ['CS', 'SE', 'Engineering', 'Other'];
    public const SPECIALIZATIONS = ['Software', 'Hardware', 'Business'];
    public const INSTITUTIONS = ['SCIT', 'CEDAT', 'UniPod', 'UIRI', 'Lwera'];
    public const PARTICIPANT_TYPES = ['Student', 'Lecturer', 'Collaborator'];

    /**
     * Relationships (optional):
     * If participants are linked to projects, you can add the relationship here later.
     */
    public function projects()
    {
        return $this->belongsToMany(Project::class, 'participant_project', 'participant_id', 'project_id');
    }
}
