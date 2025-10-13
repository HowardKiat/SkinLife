<?php

namespace App\GraphQL\Queries;

class HelloQuery
{
    public function resolve($root, array $args, $context, $resolveInfo)
    {
        return "Hello World!";
    }
}
