/**
 * Her cagrildiginda YENI bir hata yaniti uretir.
 * Paylasimli nesne kullanilmamasinin sebebi icin success-response.js'e bak.
 */
function ErrorResponse(error = {}, message = "Something went wrong") {
  return {
    success: false,
    message,
    data: {},
    error,
  };
}

module.exports = ErrorResponse;
