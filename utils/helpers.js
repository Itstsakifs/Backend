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

respon.response = (res, code, data, message) => {
  return res.status(code).json({
    status: code,
    message: message || "Success",
    data: data,
  });
};

respon.resposeOne = (res, code, data) => {
    return res.status(code).json({
        data: data,
    });
};

respon.responseErr = (res, code, error, message) => {
    return res.status(code).json({
        code: code,
        message: message || "error",
        error: error,
    });
};

module.exports = respon;
