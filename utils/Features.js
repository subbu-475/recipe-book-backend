class Features {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr=queryStr;
    }
    pagination(resPerPage){
        const currentPage=this.queryStr.page||1;
        const skipCount=resPerPage*(currentPage-1);
        this.query.limit(resPerPage).skip(skipCount);
        return this;
    }
}

module.exports = Features;