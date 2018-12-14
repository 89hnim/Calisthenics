
$(document).ready(function() {

    $('[data-toggle="tooltip"]').tooltip();   //active tooltip 

    var currentName = $('#nameProfile').attr('data-id');
    var userID = $('#userID').attr('data-id');  


    $('#nameProfile2').addClass('hide');  
    $('#editNameProfile2').addClass('hide');
    $('#passwordProfile2').addClass('hide');
    $('#editPasswordProfile2').addClass('hide');
    $('#passwordProfile3').addClass('hide');
    $('#editPasswordProfile3').addClass('hide');

    $("body").delegate("#editNameProfile", "click", function() {

        $('#nameProfile').addClass('hide');
        $('#editNameProfile').addClass('hide');
        $('#nameProfile2').removeClass('hide');
        $('#editNameProfile2').removeClass('hide');

    })

    $("body").delegate("#btnCancelEdit", "click", function() {

        $('#nameProfile2').addClass('hide');
        $('#editNameProfile2').addClass('hide');
        $('#nameProfile').removeClass('hide');
        $('#editNameProfile').removeClass('hide');

    })

    $("body").delegate("#btnCancelEditPass", "click", function() {

        $('#passwordProfile').removeClass('hide');
        $('#editPasswordProfile').removeClass('hide');
        $('#passwordProfile2').addClass('hide');
        $('#editPasswordProfile2').addClass('hide');
        $('#passwordProfile3').addClass('hide');
        $('#editPasswordProfile3').addClass('hide');

    })

    $("body").delegate("#editPasswordProfile", "click", function() {

        $('#passwordProfile2').removeClass('hide');
        $('#editPasswordProfile2').removeClass('hide');
        $('#passwordProfile').addClass('hide');
        $('#editPasswordProfile').addClass('hide');

    })

    $("body").delegate("#btnSaveChangeNameProfile", "click", function() {

        var nameChange = $('#txtNameProfile').val();

        if (nameChange.trim().length == 0) {
            alert('Please fill in the blank.');
        } else {
            if (nameChange.trim().length < 6 || nameChange.trim().length > 20) {
                alert('Username must be between 6 and 20 characters.');
            } else
            if (nameChange.trim() == currentName.trim()) {

                $('#nameProfile2').addClass('hide');
                $('#editNameProfile2').addClass('hide');
                $('#nameProfile').removeClass('hide');
                $('#editNameProfile').removeClass('hide');

            } else {
                $.ajax({

                    url: "controller/user/change_profile.php",
                    data: {nameChange:nameChange},
                    type: "POST",
                    success: function(res) {

                        if (res = 'reset success') {
                            alert(res);
                            location.reload();
                        } else alert('fail');

                    },
                    error: function(xhr, status, errorThrown) {
                        console.log(errorThrown + status + xhr);
                    }

                });
            }
        }

    })

    $("body").delegate("#btnContinuePassword", "click", function() {

        var oldPass = $('#txtOldPassword').val();

        if (oldPass.length == 0) {
            alert('Please fill in the blank.');
        } else {

            $.ajax({

                url: "controller/user/change_profile.php",
                data: { oldPass: oldPass },
                type: "POST",
                success: function(res) {
                    if (res == 'fail') {
                        alert('The passwords you entered do not match');
                    } else {

                        alert(res);

                        $('#passwordProfile2').addClass('hide');
                        $('#editPasswordProfile2').addClass('hide');
                        $('#passwordProfile3').removeClass('hide');
                        $('#editPasswordProfile3').removeClass('hide');

                    }

                },
                error: function(xhr, status, errorThrown) {
                    console.log(errorThrown + status + xhr);
                }

            });

        }

    })


    $("body").delegate("#btnSaveResetPassword", "click", function() {

        var newPass = $('#txtNewPass').val();
        var confirmNewPass = $('#txtConfirmNewPass').val();

        var passValid = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$');

        if (newPass.length == 0 || confirmNewPass.length == 0) {

            alert('Please fill in the blank.');

        }else
            if (newPass != confirmNewPass) {

                alert('The passwords you entered do not match.');

            }else
                if( !passValid.test(newPass) ) { 

                    alert('The password must have at least 8 characters, at least 1 digit(s), at least 1 lower case letter(s), at least 1 upper case letter(s)');
                
                }
                else {

                    $.ajax({

                        url: "controller/user/change_profile.php",
                        data: { newPass: newPass },
                        type: "POST",
                        success: function(res) {

                            if (res == '1') {
                                alert('bi trung voi mat khau hien tai, chon mat khau khac');
                                return;
                            } else {
                                alert(res);
                                location.reload();
                            }

                        },
                        error: function(xhr, status, errorThrown) {
                            console.log(errorThrown + status + xhr);
                        }

                    });

        }

    })



// lấy level và ngày đã tập của user đang login
    $.ajax({
        url: "controller/exercise/GetProgressTraining.php",
        type: "POST",
        data: {
            userID: userID
        },
        success: function(res) {
            var arrayProgressTraining = $.parseJSON(res);
            $("#level1").attr("href", "training.php?level=1&day=" + (parseInt(arrayProgressTraining[0].dayTrained, 10) + 1));
            $("#level2").attr("href", "training.php?level=2&day=" + (parseInt(arrayProgressTraining[1].dayTrained, 10) + 1));
            $("#level3").attr("href", "training.php?level=3&day=" + (parseInt(arrayProgressTraining[2].dayTrained, 10) + 1));

            $("#trained1").text("Day trained: "+arrayProgressTraining[0].dayTrained);
            $("#trained2").text("Day trained: "+arrayProgressTraining[1].dayTrained);
            $("#trained3").text("Day trained: "+arrayProgressTraining[2].dayTrained);

        },
        error: function(xhr, status, errorThrown) {
            console.log(errorThrown + status + xhr);
        }
    });






}) //document.ready