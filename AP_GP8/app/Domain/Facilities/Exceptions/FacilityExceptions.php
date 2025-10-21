<?php

namespace App\Domain\Facilities\Exceptions;

use Exception;

class FacilityException extends Exception
{
}

class FacilityRequiredFieldsException extends FacilityException
{
    public function __construct()
    {
        parent::__construct("Facility.Name, Facility.Location, and Facility.FacilityType are required.");
    }
}

class FacilityDuplicateException extends FacilityException
{
    public function __construct()
    {
        parent::__construct("A facility with this name already exists at this location.");
    }
}

class FacilityDeletionConstraintException extends FacilityException
{
    public function __construct()
    {
        parent::__construct("Facility has dependent records (Services/Equipment/Projects).");
    }
}

class FacilityCapabilitiesRequiredException extends FacilityException
{
    public function __construct()
    {
        parent::__construct("Facility.Capabilities must be populated when Services/Equipment exist.");
    }
}

class FacilityNotFoundException extends FacilityException
{
    public function __construct(string $facility_id)
    {
        parent::__construct("Facility with ID {$facility_id} not found.");
    }
}