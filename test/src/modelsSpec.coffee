describe 'AngularModel', ->
  beforeEach ->
    class Model extends AngularModel
    @model = new Model()

  it 'can be created with no params', ->
    expect(@model.initialize).toBeDefined()

  describe 'with initialized has_many', ->
    beforeEach ->
      class SubModel
        initialize:-> @initialized = true
      @model.hasMany = sub_models:SubModel
      @model.sub_models = [{}]
      @model.initialize()

    it 'calls initialize on the associated class', ->
      expect(@model.sub_models[0].initialized).toEqual(true)


    it 'assigns its hasMany the associated class', ->
      expect(@model.sub_models[0].constructor.name).toEqual("SubModel")

