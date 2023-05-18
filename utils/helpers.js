respon = {};

respon.responsePage = (res, code, pages,per_pages,totals,total_pages , data) => {
    return res.status(code).json({
        page: pages,
        per_page: per_pages,
        total: totals,
        total_page: total_pages,
        data: data
    });
};

respon.response = (res, code, message, data, extra) => {
    return res.status(code).json({
        status : code,
        message : message,
        data : data,
        extra : extra,
    });
};

respon.resposeOne = (res, code, data) => {
    return res.status(code).json({
        data: data,
    });
};

respon.responseErr = (res, code, message, data) => {
    return res.status(code).json({
        code: code,
        message: message || "error",
        errors: data || "",
    });
};

module.exports = respon;
