function mapper(data) {

    let S = "S";
    let SS = "SS";
    let NN = "NN";
    let NS = "NS";
    let BS = "BS";
    let BB = "BB";
    let N = "N";
    let BOOL = "BOOL";
    let NULL = "NULL";
    let M = "M";
    let L = "L";

    if (isObject(data)) {
        let keys = Object.keys(data);
        while (keys.length) {
            let key = keys.shift();
            let types = data[key];

            if (isObject(types) && types.hasOwnProperty(S)) {
                data[key] = types[S];
            } else if (isObject(types) && types.hasOwnProperty(N)) {
                data[key] = parseFloat(types[N]);
            } else if (isObject(types) && types.hasOwnProperty(BOOL)) {
                data[key] = types[BOOL];
            } else if (isObject(types) && types.hasOwnProperty(NULL)) {
                data[key] = null;
            } else if (isObject(types) && types.hasOwnProperty(M)) {
                data[key] = mapper(types[M]);
            } else if (isObject(types) && types.hasOwnProperty(L)) {
                data[key] = mapper(types[L]);
            } else if (isObject(types) && types.hasOwnProperty(SS)) {
                data[key] = types[SS];
            } else if (isObject(types) && types.hasOwnProperty(NN)) {
                data[key] = types[NN];
            } else if (isObject(types) && types.hasOwnProperty(BB)) {
                data[key] = types[BB];
            } else if (isObject(types) && types.hasOwnProperty(NS)) {
                data[key] = types[NS];
            } else if (isObject(types) && types.hasOwnProperty(BS)) {
                data[key] = types[BS];
            } else if (isObject(types)) {
                data[key] = mapper(types);
            }
        }
    }


    return data;

    function isObject(value) {
        return typeof value === "object" && value !== null;
    }
}

const unmarshalled = mapper(dynamodbObject);
console.log(unmarshalled);
