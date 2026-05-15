# Dictum SDK context

require_relative '../utility/struct/voxgig_struct'
require_relative 'control'
require_relative 'operation'
require_relative 'spec'
require_relative 'result'
require_relative 'response'
require_relative 'error'
require_relative 'helpers'

class DictumContext
  attr_accessor :id, :out, :client, :utility, :ctrl, :meta, :config,
                :entopts, :options, :entity, :shared, :opmap,
                :data, :reqdata, :match, :reqmatch, :point,
                :spec, :result, :response, :op

  def initialize(ctxmap = {}, basectx = nil)
    ctxmap ||= {}
    @id = "C#{rand(10000000..99999999)}"
    @out = {}

    @client = DictumHelpers.get_ctx_prop(ctxmap, "client") || basectx&.client
    @utility = DictumHelpers.get_ctx_prop(ctxmap, "utility") || basectx&.utility

    @ctrl = DictumControl.new
    ctrl_raw = DictumHelpers.get_ctx_prop(ctxmap, "ctrl")
    if ctrl_raw.is_a?(Hash)
      @ctrl.throw_err = ctrl_raw["throw"] if ctrl_raw.key?("throw")
      @ctrl.explain = ctrl_raw["explain"] if ctrl_raw["explain"].is_a?(Hash)
    elsif basectx&.ctrl
      @ctrl = basectx.ctrl
    end

    m = DictumHelpers.get_ctx_prop(ctxmap, "meta")
    @meta = m.is_a?(Hash) ? m : (basectx&.meta || {})

    cfg = DictumHelpers.get_ctx_prop(ctxmap, "config")
    @config = cfg.is_a?(Hash) ? cfg : basectx&.config

    eo = DictumHelpers.get_ctx_prop(ctxmap, "entopts")
    @entopts = eo.is_a?(Hash) ? eo : basectx&.entopts

    o = DictumHelpers.get_ctx_prop(ctxmap, "options")
    @options = o.is_a?(Hash) ? o : basectx&.options

    e = DictumHelpers.get_ctx_prop(ctxmap, "entity")
    @entity = e || basectx&.entity

    s = DictumHelpers.get_ctx_prop(ctxmap, "shared")
    @shared = s.is_a?(Hash) ? s : basectx&.shared

    om = DictumHelpers.get_ctx_prop(ctxmap, "opmap")
    @opmap = om.is_a?(Hash) ? om : (basectx&.opmap || {})

    @data = DictumHelpers.to_map(DictumHelpers.get_ctx_prop(ctxmap, "data")) || {}
    @reqdata = DictumHelpers.to_map(DictumHelpers.get_ctx_prop(ctxmap, "reqdata")) || {}
    @match = DictumHelpers.to_map(DictumHelpers.get_ctx_prop(ctxmap, "match")) || {}
    @reqmatch = DictumHelpers.to_map(DictumHelpers.get_ctx_prop(ctxmap, "reqmatch")) || {}

    pt = DictumHelpers.get_ctx_prop(ctxmap, "point")
    @point = pt.is_a?(Hash) ? pt : basectx&.point

    sp = DictumHelpers.get_ctx_prop(ctxmap, "spec")
    @spec = sp.is_a?(DictumSpec) ? sp : basectx&.spec

    r = DictumHelpers.get_ctx_prop(ctxmap, "result")
    @result = r.is_a?(DictumResult) ? r : basectx&.result

    rp = DictumHelpers.get_ctx_prop(ctxmap, "response")
    @response = rp.is_a?(DictumResponse) ? rp : basectx&.response

    opname = DictumHelpers.get_ctx_prop(ctxmap, "opname") || ""
    @op = resolve_op(opname)
  end

  def resolve_op(opname)
    return @opmap[opname] if @opmap[opname]
    return DictumOperation.new({}) if opname.empty?

    entname = @entity&.respond_to?(:get_name) ? @entity.get_name : "_"
    opcfg = VoxgigStruct.getpath(@config, "entity.#{entname}.op.#{opname}")

    input = (opname == "update" || opname == "create") ? "data" : "match"

    points = []
    if opcfg.is_a?(Hash)
      t = VoxgigStruct.getprop(opcfg, "points")
      points = t if t.is_a?(Array)
    end

    op = DictumOperation.new({
      "entity" => entname,
      "name" => opname,
      "input" => input,
      "points" => points,
    })
    @opmap[opname] = op
    op
  end

  def make_error(code, msg)
    DictumError.new(code, msg, self)
  end
end
