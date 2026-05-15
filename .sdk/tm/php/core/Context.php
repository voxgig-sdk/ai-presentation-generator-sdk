<?php
declare(strict_types=1);

// AiPresentationGenerator SDK context

require_once __DIR__ . '/Control.php';
require_once __DIR__ . '/Operation.php';
require_once __DIR__ . '/Spec.php';
require_once __DIR__ . '/Result.php';
require_once __DIR__ . '/Response.php';
require_once __DIR__ . '/Error.php';
require_once __DIR__ . '/Helpers.php';

class AiPresentationGeneratorContext
{
    public string $id;
    public array $out;
    public mixed $client;
    public ?AiPresentationGeneratorUtility $utility;
    public AiPresentationGeneratorControl $ctrl;
    public array $meta;
    public ?array $config;
    public ?array $entopts;
    public ?array $options;
    public mixed $entity;
    public ?array $shared;
    public array $opmap;
    public array $data;
    public array $reqdata;
    public array $match;
    public array $reqmatch;
    public ?array $point;
    public ?AiPresentationGeneratorSpec $spec;
    public ?AiPresentationGeneratorResult $result;
    public ?AiPresentationGeneratorResponse $response;
    public AiPresentationGeneratorOperation $op;

    public function __construct(array $ctxmap = [], ?self $basectx = null)
    {
        $this->id = 'C' . random_int(10000000, 99999999);
        $this->out = [];

        $this->client = AiPresentationGeneratorHelpers::get_ctx_prop($ctxmap, 'client') ?? ($basectx ? $basectx->client : null);
        $this->utility = AiPresentationGeneratorHelpers::get_ctx_prop($ctxmap, 'utility') ?? ($basectx ? $basectx->utility : null);

        $this->ctrl = new AiPresentationGeneratorControl();
        $ctrl_raw = AiPresentationGeneratorHelpers::get_ctx_prop($ctxmap, 'ctrl');
        if (is_array($ctrl_raw)) {
            if (array_key_exists('throw', $ctrl_raw)) {
                $this->ctrl->throw_err = $ctrl_raw['throw'];
            }
            if (isset($ctrl_raw['explain']) && is_array($ctrl_raw['explain'])) {
                $this->ctrl->explain = $ctrl_raw['explain'];
            }
        } elseif ($basectx !== null && $basectx->ctrl !== null) {
            $this->ctrl = $basectx->ctrl;
        }

        $m = AiPresentationGeneratorHelpers::get_ctx_prop($ctxmap, 'meta');
        $this->meta = is_array($m) ? $m : ($basectx ? $basectx->meta ?? [] : []);

        $cfg = AiPresentationGeneratorHelpers::get_ctx_prop($ctxmap, 'config');
        $this->config = is_array($cfg) ? $cfg : ($basectx ? $basectx->config : null);

        $eo = AiPresentationGeneratorHelpers::get_ctx_prop($ctxmap, 'entopts');
        $this->entopts = is_array($eo) ? $eo : ($basectx ? $basectx->entopts : null);

        $o = AiPresentationGeneratorHelpers::get_ctx_prop($ctxmap, 'options');
        $this->options = is_array($o) ? $o : ($basectx ? $basectx->options : null);

        $e = AiPresentationGeneratorHelpers::get_ctx_prop($ctxmap, 'entity');
        $this->entity = $e ?? ($basectx ? $basectx->entity : null);

        $s = AiPresentationGeneratorHelpers::get_ctx_prop($ctxmap, 'shared');
        $this->shared = is_array($s) ? $s : ($basectx ? $basectx->shared : null);

        $om = AiPresentationGeneratorHelpers::get_ctx_prop($ctxmap, 'opmap');
        $this->opmap = is_array($om) ? $om : ($basectx ? $basectx->opmap ?? [] : []);

        $this->data = AiPresentationGeneratorHelpers::to_map(AiPresentationGeneratorHelpers::get_ctx_prop($ctxmap, 'data')) ?? [];
        $this->reqdata = AiPresentationGeneratorHelpers::to_map(AiPresentationGeneratorHelpers::get_ctx_prop($ctxmap, 'reqdata')) ?? [];
        $this->match = AiPresentationGeneratorHelpers::to_map(AiPresentationGeneratorHelpers::get_ctx_prop($ctxmap, 'match')) ?? [];
        $this->reqmatch = AiPresentationGeneratorHelpers::to_map(AiPresentationGeneratorHelpers::get_ctx_prop($ctxmap, 'reqmatch')) ?? [];

        $pt = AiPresentationGeneratorHelpers::get_ctx_prop($ctxmap, 'point');
        $this->point = is_array($pt) ? $pt : ($basectx ? $basectx->point : null);

        $sp = AiPresentationGeneratorHelpers::get_ctx_prop($ctxmap, 'spec');
        $this->spec = ($sp instanceof AiPresentationGeneratorSpec) ? $sp : ($basectx ? $basectx->spec : null);

        $r = AiPresentationGeneratorHelpers::get_ctx_prop($ctxmap, 'result');
        $this->result = ($r instanceof AiPresentationGeneratorResult) ? $r : ($basectx ? $basectx->result : null);

        $rp = AiPresentationGeneratorHelpers::get_ctx_prop($ctxmap, 'response');
        $this->response = ($rp instanceof AiPresentationGeneratorResponse) ? $rp : ($basectx ? $basectx->response : null);

        $opname = AiPresentationGeneratorHelpers::get_ctx_prop($ctxmap, 'opname') ?? '';
        $this->op = $this->resolve_op($opname);
    }

    public function resolve_op(string $opname): AiPresentationGeneratorOperation
    {
        if (isset($this->opmap[$opname])) {
            return $this->opmap[$opname];
        }
        if ($opname === '') {
            return new AiPresentationGeneratorOperation([]);
        }

        $entname = (is_object($this->entity) && method_exists($this->entity, 'get_name'))
            ? $this->entity->get_name()
            : '_';
        $opcfg = \Voxgig\Struct\Struct::getpath($this->config, "entity.{$entname}.op.{$opname}");

        $input = ($opname === 'update' || $opname === 'create') ? 'data' : 'match';

        $points = [];
        if (is_array($opcfg)) {
            $t = \Voxgig\Struct\Struct::getprop($opcfg, 'points');
            if (is_array($t)) {
                $points = $t;
            }
        }

        $op = new AiPresentationGeneratorOperation([
            'entity' => $entname,
            'name' => $opname,
            'input' => $input,
            'points' => $points,
        ]);
        $this->opmap[$opname] = $op;
        return $op;
    }

    public function make_error(string $code, string $msg): AiPresentationGeneratorError
    {
        return new AiPresentationGeneratorError($code, $msg, $this);
    }
}
