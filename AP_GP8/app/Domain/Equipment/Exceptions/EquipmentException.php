<?php


namespace App\Domain\Equipment\Exceptions;

use Exception;

class EquipmentException extends Exception
{
    public function __construct(string $message)
    {
        parent::__construct($message);
    }
}