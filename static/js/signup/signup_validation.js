$(document).ready(() => {
    let result1 = false; // username
    let result2 = false; // password
    let result3 = false; // confirm_password
    let result4 = false; // email

    // Проверка логина через AJAX
    async function checkUsername() {
        let loginX = $('#username').val().trim();
        let loginRe = /^[a-zA-Z][a-zA-Z0-9_\-\.]{4,15}$/;

        if (!loginRe.test(loginX)) {
            $('#username-err').text('Помилка формату введення');
            result1 = false;
            return false;
        }

        try {
            const response = await $.ajax({
                url: '/ajax_reg',
                type: 'GET',
                data: { username: loginX },
            });

            if (response.message === 'Логін зайнятий!') {
                $('#username-err').text(response.message);
                result1 = false;
            } else {
                $('#username-err').text('');
                result1 = true;
            }
            return result1;
        } catch (err) {
            $('#username-err').text('Помилка при перевірці логіну');
            result1 = false;
            return false;
        }
    }

    // Остальные проверки (password, confirm_password, email)
    $('#password').blur(() => {
        let pass1X = $('#password').val();
        let passRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9_\-\.]{8,}$/;
        if (passRe.test(pass1X)) {
            $('#password-err').text('');
            result2 = true;
        } else {
            $('#password-err').text('Помилка формату введення пароля');
            result2 = false;
        }
    });

    $('#confirm_password').blur(() => {
        let pass1X = $('#password').val();
        let pass2X = $('#confirm_password').val();
        if (pass1X === pass2X && pass2X !== '') {
            $('#confirm_password-err').text('');
            result3 = true;
        } else {
            $('#confirm_password-err').text('Введені паролі не співпадають');
            result3 = false;
        }
    });

    $('#email').blur(() => {
        let emailX = $('#email').val().trim();
        let emailRe = /^([a-z0-9._-]+)@([a-z0-9_-]+)(\.[a-z]{2,6})$/i;
        if (emailRe.test(emailX)) {
            $('#email-err').text('');
            result4 = true;
        } else {
            $('#email-err').text('Не вірно вказана пошта');
            result4 = false;
        }
    });

    // Submit формы с учётом асинхронной проверки логина
    $('#form1').submit(async (e) => {
        e.preventDefault(); // сначала блокируем отправку

        // Ждём проверки логина
        await checkUsername();

        // Принудительно вызываем blur для остальных полей
        $('#password').blur();
        $('#confirm_password').blur();
        $('#email').blur();

        // Проверяем флаги
        if (result1 && result2 && result3 && result4) {
            document.getElementById('form1').submit();
        } else {
            alert('Форма містить некоректні дані!\nВідправка даних заблокована!');
        }
    });
});
