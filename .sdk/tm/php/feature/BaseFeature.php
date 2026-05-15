<?php
declare(strict_types=1);

// Dictum SDK base feature

class DictumBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(DictumContext $ctx, array $options): void {}
    public function PostConstruct(DictumContext $ctx): void {}
    public function PostConstructEntity(DictumContext $ctx): void {}
    public function SetData(DictumContext $ctx): void {}
    public function GetData(DictumContext $ctx): void {}
    public function GetMatch(DictumContext $ctx): void {}
    public function SetMatch(DictumContext $ctx): void {}
    public function PrePoint(DictumContext $ctx): void {}
    public function PreSpec(DictumContext $ctx): void {}
    public function PreRequest(DictumContext $ctx): void {}
    public function PreResponse(DictumContext $ctx): void {}
    public function PreResult(DictumContext $ctx): void {}
    public function PreDone(DictumContext $ctx): void {}
    public function PreUnexpected(DictumContext $ctx): void {}
}
