<?php

namespace App\Domain\Equipment\Exceptions;

class InvalidSupportPhaseException extends EquipmentException
{
    public function __construct()
    {
        parent::__construct("Electronics equipment must support Prototyping or Testing phases.");
    }
}