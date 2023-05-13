const extras = {
    url: "https://reqres.in/#support-heading",
    text: "To keep ReqRes free, contributions towards server costs are appreciated!",
};

respon = {};

respon.response = (res, code, pages,per_pages,totals,total_pages , data, extra = extras) => {
    return res.status(code).json({
        page: pages,
        per_page: per_pages,
        total: totals,
        total_page: total_pages,
        data: data,
        support: extra,
    });
};

respon.resposeOne = (res, code, data, extra = extras) => {
    return res.status(code).json({
        data: data,
        support: extra,
    });
};

respon.responseErr = (res, code, message, data) => {
    return res.status(code).json({
        code: code,
        message: message || "error",
        errors: data || "",
    });
};

respon.responseInput = (res, code, data) => {
    return res.status(code).json({
        data
    });
};


module.exports = respon;
