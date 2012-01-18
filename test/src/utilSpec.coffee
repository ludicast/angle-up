describe 'autoWrap', ->
  beforeEach ->
    class StringWrapper
    @obj = objectId:"myId"
    autowrap(StringWrapper)(@obj)


  it "preserves fields", ->
    expect(@obj.objectId).toEqual("myId")
  it "assigns prototype", ->
    expect(@obj.constructor.name).toEqual("StringWrapper")
