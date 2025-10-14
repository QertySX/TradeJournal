$(function () {
  const $form = $('#login-form');
  const $authMessage = $('#auth-message');
  const $submitBtn = $('#submit-btn');

  $form.on('submit', function (e) {
    e.preventDefault();

    $authMessage.text('').css('color', '');
    $submitBtn.prop('disabled', true).text('Зачекайте...');

    $.ajax({
      url: '/login', // всегда указываем URL явно
      type: 'POST',
      data: $form.serialize(),
      success: function (response) {
        const color = response.status === 'success' ? 'green' : 'red';
        $authMessage.text(response.message).css('color', color);

        if (response.status === 'success') {
          setTimeout(() => {
            window.location.href = '/index';
          }, 1000);
        }
      },
      error: function () {
        $authMessage.text('Помилка з’єднання із сервером.').css('color', 'red');
      },
      complete: function () {
        $submitBtn.prop('disabled', false).text('Увійти');
      }
    });
  });
});
