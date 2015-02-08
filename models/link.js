/**
 * Created by YuzhongJi on 2/7/15.
 */

var Qs=require('querystring');

var getLink=function (endpoint, offset, limit, query, field) {
    var link_constraints=query;
    link_constraints.offset=offset;
    link_constraints.limit=limit;
    if(field){
    link_constraints.field=field;
    }
    var query_string = Qs.stringify(link_constraints);
    if (query_string === "") {
        return endpoint;
    } else {
        return endpoint+'?'+Qs.stringify(link_constraints);
    }
};

exports.construct=function(endpoint, offset, limit, query, field, collectionSize) {
    var res = [];
    if (limit != 0) {
        res[res.length] = {rel: "first", href: getLink(endpoint, 0, limit, query, field)};
        res[res.length] = {rel: "last", href: getLink(endpoint, collectionSize - limit, limit, query, field)};
        if (offset > 0 &&
            collectionSize != limit) {
            var prev_offset = (offset >= limit) ? (offset - limit) : 0;
            res[res.length] = {rel: "prev", href: getLink(endpoint, prev_offset, limit, query, field)};
        }
        if (offset >= 0 &&
            offset + limit < collectionSize &&
            collectionSize != limit) {
            var next_offset = offset + limit;
            res[res.length] = {rel: "next", href: getLink(endpoint, next_offset, limit, query, field)};
        }
    }

    return res;
}


