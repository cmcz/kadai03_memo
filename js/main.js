$(document).ready(function() {
    // Default Setting: Load 2024/8/15 Message
    let selectedDate = '08/15/2024';
    loadMessageForDate(selectedDate);

    // Listen for date changes 
    $('#datepicker-inline').on('changeDate', function(e) {
        selectedDate = e.detail.date;
        const formattedDate = formatDate(selectedDate);
        loadMessageForDate(formattedDate);
    });

    // Load message for a specific date 
    function loadMessageForDate(date) {
        let history = JSON.parse(localStorage.getItem('dateMessageHistory')) || [];
        const entry = history.find(item => item.date === date);
        if (entry) {
            $('#message').val(entry.message);
        } else {
            $('#message').val('');
        }
    }

    // Format Flowbite Calendar date in MM/DD/YYYY format
    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }

    //////////////// Button ////////////////
    // Save button
    $('#saveButton').on('click', function() {
        const message = $('#message').val();
        if (selectedDate && message) {
            const formattedDate = formatDate(new Date(selectedDate));
            let history = JSON.parse(localStorage.getItem('dateMessageHistory')) || [];
            const existingEntryIndex = history.findIndex(item => item.date === formattedDate);
            if (existingEntryIndex >= 0) {
                history[existingEntryIndex].message = message;
            } else {
                history.push({ date: formattedDate, message: message });
            }
            localStorage.setItem('dateMessageHistory', JSON.stringify(history));
        } else {
            alert('日付を選択し、日記を記入してください');
        }
    });

    // Show History button
    $('#showHistoryButton').on('click', function() {
        $('#dateMessageHistoryList').empty();
        let history = JSON.parse(localStorage.getItem('dateMessageHistory')) || [];
        history.forEach(function(item) {
            $('#dateMessageHistoryList').append(`<li>日付: ${item.date}, 日記内容: ${item.message}</li>`);
        });
    });

    // Clear All button
    $('#clearAllButton').on('click', function() {
        localStorage.removeItem('dateMessageHistory');
        $('#dateMessageHistoryList').empty();
        $('#message').val('');
        alert('すべてのデータがクリアされました！');
    });
});