/**
 * Her cagrildiginda YENI bir yanit nesnesi uretir.
 *
 * Dikkat: modul seviyesinde tek bir nesne export edip onu mutate etmek
 * (SuccessResponse.data = ...) tehlikelidir. Node'da require cache'lendigi
 * icin o nesne tum istekler arasinda paylasilir ve es zamanli iki istek
 * birbirinin verisinin uzerine yazar.
 */
function SuccessResponse(
  data = {},
  message = "Successfully completed the request",
) {
  return {
    success: true,
    message,
    data,
    error: {},
  };
}

module.exports = SuccessResponse;
