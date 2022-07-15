Parse.Cloud.define("editUserProperty", async (request) => {
    const objectId = request.params.objectId;
    const key = request.params.key;
    const value = request.params.value;

    var User = Parse.Object.extend(Parse.User);
    var query = new Parse.Query(User);
    let result = await query.get(objectId, { useMasterKey: true });
    if (!result) new Error("No user found!");

    result.set("healthcareprovider", "letusseeifupdates");

    try {
        result.save(null, { useMasterKey: true });
        return "User updated successfully!";
    } catch (e) {
        return e.message;
    }
});