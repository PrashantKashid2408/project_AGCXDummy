var wasCallConnected = false;
var LoadCallCount = 0;
var LoadCountAllowed = 3;

function StartRecording(uniqueCallID, serverid) {
	//alert("Fn Call:" +serverid )
    var ReturnURL = '';
    var pageurl = '/api/Recording/startRecording'
    var pageurlAudio = '/api/Recording/startRecording'

	var callingPage = window.location.href;
	//alert(callingPage)
	if (serverid) {
		if (callingPage.toLowerCase().indexOf("accept") > -1) {
			$.ajax({
				url: pageurl,
				type: "POST",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
                data: JSON.stringify({ sCallId: serverid, recordingFormat: "", UniqueCallID: uniqueCallID }),
				success: function (data) {
					//alert("Call Success:" + serverid)
				}
			});

			//$.ajax({
   //             url: pageurlAudio,
			//	type: "POST",
			//	contentType: "application/json; charset=utf-8",
			//	dataType: "json",
   //             data: JSON.stringify({ sCallId: serverid, recordingFormat: "wav", UniqueCallID: uniqueCallID }),
			//	success: function (data) {
			//		//alert("Call Success:" + serverid)
			//	}
			//});
		}
	}
}

function GetAvailableAgent(txt) {
    var callingPage = window.location.href;
    if (callingPage.toLowerCase().indexOf("call") > -1) {
        //$("#divLoader").append(getLoader());
        $.ajax({
            url: "/User/GetAvailableAgent/",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            async: false,
            success: function (data) {
                //removeLoader("#divLoader");
                if (data.Data.ID > 0) {
                    $("#callee-acs-user-id").val(data.Data.AgentCallID)
                }
                else if (data.Data.ID == -1) {
                    //showBSAlertNonClosable(__infoCaption, "All the customer care agents are busy at the moment. Please try after some time. Sorry for the inconvenience.", __WARNING);
                    ShowConnectingMsg(txt + ' no one');
                    $("#callee-acs-user-id").val("")
                    setTimeout(function () {
                        closeAllBsDialogs();
                    }, 5000);
                }
            },
            complete: function () {
                setTimeout(function () {
                    //removeLoader("#divLoader");
                }, 300);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //$("#divLoader").removeClass("box");
                //alert(xhr);
                //alert(ajaxOptions);
                //alert(thrownError);
                //alert(xhr.error().statusText);
                setTimeout(function () {
                    //removeLoader("#divLoader");
                }, 300);
            }
        });
    }
}

function GetKioskDetails(callerID) {
    var callingPage = window.location.href;
    if (callingPage.toLowerCase().indexOf("accept") > -1) {
        //$("#divLoader").append(getLoader());
        $.ajax({
            url: "/User/GetKioskDetails/",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ TravellerCallerID: callerID }),
            cache: false,
            async: true,
            success: function (data) {
                //removeLoader("#divLoader");
                if (data.Data.ID > 0) {
                    //alert(data.Data.DeviceName)
                    $("#lblKioskName").text(data.Data.DeviceName)
                    $("#lblKioskName").show();
                }
                else {
                    $("#lblKioskName").hide();
                }
            },
            complete: function () {
                setTimeout(function () {
                    //$("#lblKioskName").hide();
                }, 300);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $("#lblKioskName").hide();
            }
        });
    }
}

function FreeAgent(agentCallerID, frm) {
    console.log("this is from: " + frm)
    var callingPage = window.location.href;
    if (callingPage.toLowerCase().indexOf("accept") > -1) {
        //$("#divLoader").append(getLoader());
        $.ajax({
            url: "/User/ChangeAvailabilityStatus/",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ AvailabilityStatus: "1" }),
            cache: false,
            async: false,
            success: function (data) {
                //removeLoader("#divLoader");
                
            },
            complete: function () {
                setTimeout(function () {
                    //removeLoader("#divLoader");
                }, 300);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //$("#divLoader").removeClass("box");
                setTimeout(function () {
                    //removeLoader("#divLoader");
                }, 300);
            }
        });
    }
    else if (callingPage.toLowerCase().indexOf("call") > -1 && agentCallerID!='') {
        //$("#divLoader").append(getLoader());
        $("#callee-acs-user-id").val("");
        $.ajax({
            url: "/User/ChangeAvailabilityStatus/",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ AvailabilityStatus: "1", AgentCallerID: agentCallerID }),
            cache: false,
            async: false,
            success: function (data) {
                //removeLoader("#divLoader");

            },
            complete: function () {
                setTimeout(function () {
                    //removeLoader("#divLoader");
                }, 300);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //$("#divLoader").removeClass("box");
                setTimeout(function () {
                    //removeLoader("#divLoader");
                }, 300);
            }
        });
    }
}

function MakeCallTransaction(uniqueCallID, incomingCallID) {
    var callingPage = window.location.href;
    if (callingPage.toLowerCase().indexOf("accept") > -1) {
        //$("#divLoader").append(getLoader());
        $.ajax({
            url: "/Home/MakeCallTransaction/",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ UniqueCallID: uniqueCallID, IncomingCallID: incomingCallID }),
            cache: false,
            async: true,
            success: function (data) {
                //removeLoader("#divLoader");
                //$("#callee-acs-user-id").val(data.Data.AgentCallID)
            },
            complete: function () {
                setTimeout(function () {
                    //removeLoader("#divLoader");
                }, 300);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //$("#divLoader").removeClass("box");
                setTimeout(function () {
                    //removeLoader("#divLoader");
                }, 300);
            }
        });
    }
}

function UpdateCallTransactionsEndTime(uniqueCallID) {
    var callingPage = window.location.href;
    if (callingPage.toLowerCase().indexOf("accept") > -1) {
        //$("#divLoader").append(getLoader());
        var callLanguage = $('#hdnCallLanguage').val();
        $('#hdnCallLanguage').val('3');
        $.ajax({
            url: "/Home/UpdateCallTransactionsEndTime/",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ UniqueCallID: uniqueCallID, CallLanguage: callLanguage }),
            cache: false,
            async: true,
            success: function (data) {
                //removeLoader("#divLoader");
                //$("#callee-acs-user-id").val(data.Data.AgentCallID)
            },
            complete: function () {
                setTimeout(function () {
                    //removeLoader("#divLoader");
                }, 300);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //$("#divLoader").removeClass("box");
                setTimeout(function () {
                    //removeLoader("#divLoader");
                }, 300);
            }
        });
    }
}

function InsertAccessMember(uniqueCallID, callStatus) {
    //$("#divLoader").append(getLoader());
    $.ajax({
        url: "/Home/InsertAM/",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ UniqueCallID: uniqueCallID, CallStatus: callStatus }),
        cache: false,
        async: true,
        success: function (data) {
            //removeLoader("#divLoader");
            //$("#callee-acs-user-id").val(data.Data.AgentCallID)
        },
        complete: function () {
            setTimeout(function () {
                //removeLoader("#divLoader");
            }, 300);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            //$("#divLoader").removeClass("box");
            setTimeout(function () {
                //removeLoader("#divLoader");
            }, 300);
        }
    });
}

function ShowDefaultScreen(frm) {
    $("#allStepID").removeClass("video_container_loader");
    RemoveAllMsg()
    //$(".all_steps").find(".all_steps_inner").html("<div class='para-text'>Walk to me and stand on the footprints marked on the floor near the screen.</div>");
    if (frm == "ThankYouMsg")
        $(".all_steps").find(".all_steps_inner").html("");
    else {
        $(".all_steps").find(".all_steps_inner").html("<div class='para-text'><p>Connecting to a passenger service agent...</p></div>");
        var callingPage = window.location.href;
        if (callingPage.toLowerCase().indexOf("call") > -1 && faceSpotted == true && wasCallConnected == false) {
            showConnectingMsgTimeOut = showConnectingMsgTimeOut + "," + setTimeout(function () {
                //ShowDefaultScreen("3 mins")
                faceSpotted = false;
                //if (LoadCallCount > LoadCountAllowed) {
                //history.go(-2);
                FreeAgent($("#callee-acs-user-id").val(), '7commonShowDefaultScreen')
                setTimeout(function () {
                    window.location.href = '/Home/Call';
                }, 5000);
                //}
            }, 65000);
        }
    }
    console.log("this is Default Screen from : " + frm)
}


function PreVideoMsg(frm) {
    $("#allStepID").removeClass("video_container_loader");
    RemoveAllMsg()
    $(".all_steps").find(".all_steps_inner").html("<div class='para-text'><p>Connecting to a passenger service agent...</p></div>");
    console.log("this is PreVideoMsg() : " + frm)
}


var noFaceDefault;
function ShowDefaultScreenAfterWait(cnt) {
    if ($("#hdnCallTimeOut").val() == "1") {
        //$("#hdnCallTimeOut").val("")
        //RemoveAllMsg()
        //ShowConnectingMsg(cnt + 'Noface')
        //noFaceDefault = setTimeout(function () {
            ShowDefaultScreen(cnt + 'Noface ')
        //}, 6000);
    }
}

var showConnectingMsgTimeOut = "";
function ShowConnectingMsg(frm) {
    console.log("this is ShowConnectingMsg():")
    $("#allStepID").removeClass("video_container_loader");
    RemoveAllMsg()
    //$(".all_steps").find(".all_steps_inner").html("<div class='para-text'><p>We thank you for your patience.</p><p class='mtop30'>All our passenger service executives are attending to other passengers at the moment.</p><p class='mtop30'>Your time is valuable to us.</p><p class='mtop30'>Please wait while we assign the next available passenger service executive to attend to you.</p></div>");
    $(".all_steps").find(".all_steps_inner").html("<div class='para-text'><p>Connecting to a passenger service agent...</p></div>");
    var callingPage = window.location.href;
    if (callingPage.toLowerCase().indexOf("call") > -1) {
        showConnectingMsgTimeOut = showConnectingMsgTimeOut + "," + setTimeout(function () {
            //ShowDefaultScreen("3 mins")
            faceSpotted = false;
            //if (LoadCallCount > LoadCountAllowed) {
                //history.go(-2);
            if (frm != "Connecting") {
                FreeAgent($("#callee-acs-user-id").val(), '8commonShowConnectingMsg')
                setTimeout(function () {
                    window.location.href = '/Home/Call';
                }, 5000);
            }
            //}
        }, 45000);
    }
}

var myCallEndInitiate;
var myCallRinging;
function ShowCallInitiationMsg() {
    console.log("this is ShowCallInitiationMsg():")
    $("#allStepID").removeClass("video_container_loader");
    var callingPage = window.location.href;
    if (callingPage.toLowerCase().indexOf("call") > -1) {
        if (noFaceDefault)
            clearTimeout(noFaceDefault);
        if (showConnectingMsgTimeOut && showConnectingMsgTimeOut!="") {
            for (i = 0; i < showConnectingMsgTimeOut.split(',').length; i++)
                if (showConnectingMsgTimeOut.split(',')[i] != '' && showConnectingMsgTimeOut.split(',')[i] != undefined) {
                    clearTimeout(showConnectingMsgTimeOut.split(',')[i]);
                    console.log("this is ShowCallInitiationMsg(showConnectingMsgTimeOut=" + showConnectingMsgTimeOut.split(',')[i] + "):")
                }
        }
        console.log("this is ShowCallInitiationMsg(showConnectingMsgTimeOut=" + showConnectingMsgTimeOut + "):")

        showConnectingMsgTimeOut = "";
    }
    RemoveAllMsg()
    //showBSAlertNonClosable(__infoCaption, "We are connecting you with our passenger service executive. This call may be recorded for quality and training purposes.", __INFO);
    $(".all_steps").find(".all_steps_inner").html("<div class='para-text'><p>Connecting to a passenger service agent...</p></div>");
    myCallEndInitiate = setTimeout(function () {
        CallWaitTimeout()
    }, 29000);
}

function ClearTimeOut() {
    try {
        if (myCallRinging)
            clearTimeout(myCallRinging);
    } catch (e) {
    }
    try {
        if (myCallEndInitiate)
            clearTimeout(myCallEndInitiate);
    } catch (e) {
    }
    
}


function ClearNoFaceTimeOut() {
    try {
        if (noFaceTimeout)
            clearTimeout(noFaceTimeout);
    } catch (e) {
    }
}

function ShowRingMsg() {
    RemoveAllMsg();
    var audio = '';
    audio += '<audio id="telephoneRing" preload="auto" controls autoplay loop style="visibility: hidden;">';
    audio += '  <source src="../Content/audio/telephone-ring-02.mp3" type="audio/mpeg">';
    audio += '  Your browser does not support the audio element.';
    audio += '</audio>';
    audio += '<div class="div-ringingcall"><img src="../images/ringing-call.gif" alt="ringing-call.gif" class="img-ringingcall"></div>';
    $(".all_stepsAccept").find(".all_stepsAccept_inner").html(audio);
    //if ($("#telephoneRing").is(":visible")) {
    //    setTimeout(function () {
    //        document.getElementById('telephoneRing').play();
    //    }, 500);
    //}
    myCallRinging = setTimeout(function () {
        RingTimeout()
    }, 26000);
}
//At Agents end
function RingTimeout() {
    //if (!wasCallConnected) {
        RemoveAllMsg()
    FreeAgent("", '10commonRingTimeout');
        //$('#hangup-call-button').click();
    HangtheCall()
    //}
}

function HangtheCall() {
    var isHangDisabled = false;
    if ($('#hangup-call-button').hasClass("btn-disable")) {
        isHangDisabled = true;
        $('#hangup-call-button').removeClass("btn-disable")
        $('#hangup-call-button').prop("disabled", false);
    }
    //$('#hangup-call-button').click();
    $('#hdnhangup-call-button').click();
    //hangtheCallWithLang(3)
    //hangtheCallLangPopup(3);
    if (isHangDisabled) {
        $('#hangup-call-button').addClass("btn-disable")
        $('#hangup-call-button').prop("disabled", true);
    }
}

function hangtheCallLangPopup(langSel) {
    BootstrapDialog.show({
        title: 'Select Language',
        id: "divSelLang",
        size: BootstrapDialog.SIZE_NORMAL,
        type: getDialogType("PRIMARY"),
        message: function () {
            var $message = $('<div></div>');
            var html = '';
            html += '<div>';
            html += '   <p><strong>Select the Language in which the conversation took place.</strong></p>';
            html += '   <div style="display: flex; flex-direction: row; justify-content: space-between">';
            html += '       <button id="langEn" type="button" class="btnLang" onclick="hangtheCallWithLang(3)" style="width: 220px;">English</button>';
            html += '       <button id="langHn" type="button" class="btnLang" onclick="hangtheCallWithLang(4)" style="width: 220px;">Hindi</button>';
            html += '   </div>';
            html += '   <div class="clearfix"></div>';
            html += '</div>';
            $message.append(html);
            return $message;
        },

        closable: false,
        draggable: false,
        //buttons: [
        //    {
        //        label: "Cancel",
        //        action: function (dialog) {
        //            dialog.close();
        //        }
        //    }
        //],
        onshown: function (dialogRef) {
            //
        }
    });
}

function hangtheCallWithLang(langSel) {
    console.log("this is hang clicked for : " + langSel)
    $('#hdnCallLanguage').val(langSel);
    HangtheCall()
    $('#divSelLang').modal('hide');
}

//Cutomer End Wait Timeout
var callTimeOutCount = 0;
function CallWaitTimeout() {
    console.log("this is CallWaitTimeout():")
    //if (callTimeOutCount < 2) {
    if (!wasCallConnected) {
        $("#hdnCallTimeOut").val("1");
        HangtheCall()
        $("#callee-acs-user-id").val("")
        $("#hdnCallStatus").val("0")
        callTimeOutCount = callTimeOutCount + 1
        RemoveAllMsg();
        ShowConnectingMsg(callTimeOutCount + 'WaitTimeout')
        GetAvailableAgent('wait ')
        $('#start-call-button').addClass("btn-disable")
        $('#start-call-button').prop("disabled", false)
        //startVisible = false;
        //if ($("#connectedLabel").is(":hidden") == true && $('#start-call-button').hasClass("btn-disable") == false) {
        //    faceSpotted = false;
        //}
        //if ($("#hdnCallStatus").val() == "0") {
        //    faceSpotted = false;
        //}
            
        //faceSpotted = false;
        //CheckStart()
    }
    //}
    //else {
    //    callTimeOutCount = 0;
    //    ShowDefaultScreenAfterWait(callTimeOutCount)
    //}
}

var thankyouStatus = 0;
function ShowThankYouMsg() {
    $("#allStepID").removeClass("video_container_loader");
    thankyouStatus = 1;
    var callingPage = window.location.href;
    //if ($("#hdnCallStatus").val() != "1") {
        //alert("Thank")
        RemoveAllMsg();
        var seconds = 5;
    $(".all_steps").find(".all_steps_inner").html("<div class='para-text'><p>Thank you for talking to us.<br />Have a safe journey!<br /><br /></p><p><span class='countdown'>" + seconds + "</span><p></div>");
        var count = setInterval(function () {
            $("span.countdown").html(seconds);
            if (seconds > 2 && seconds < 10) {
                FreeAgent($("#callee-acs-user-id").val(), '9commonShowThankYouMsg')
            }
            if (seconds < 2) {
                clearInterval(count);
                //ShowDefaultScreen('ThankYouMsg ')
                $("#hdnCallStatus").val("0")
                if (callingPage.toLowerCase().indexOf("call") > -1) {
                    thankyouStatus = 0;
                    //startVisible = true;
                    faceSpotted = false;
                    //history.go(-2);
                    window.location.href = '/Home/Call';
                    //$("#allStepID").addClass("video_container_loader");
                }
            }
            seconds--;
            if (seconds < 10) {
                minutes = "0" + seconds
            };
        }, 1000);
    //}
}

function RemoveAllMsg() {
    if ($(".all_steps"))
        $(".all_steps").find(".all_steps_inner").html("");
    if ($(".all_stepsAccept"))
        $(".all_stepsAccept").find(".all_stepsAccept_inner").html("");
}

function CheckCallStatus(objCall) {
    //alert(objCall.state + ":" + objCall.direction)
    console.log("this is Status Check:" + objCall.state + ":" + objCall.direction)
}

function CheckIfAgentInactive() {
    var callingPage = window.location.href;
    if (callingPage.toLowerCase().indexOf("accept") > -1) {
        //if (($('#start-call-button').hasClass("btn-disable") || $("#start-call-button").prop("disabled")) && ($('#hangup-call-button').hasClass("btn-disable"))) {// || $("#hangup-call-button").prop("disabled")
        if (document.getElementById('telephoneRing') == null && document.getElementById('connectedLabel').hidden == true) {
            console.log("this is CheckIfAgentInactive():")
            $.ajax({
                url: "/User/MakeAgentActive/",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
                async: false,
                success: function (data) {
                },
                complete: function () {
                    setTimeout(function () {
                        //removeLoader("#divLoader");
                    }, 300);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    setTimeout(function () {
                        //removeLoader("#divLoader");
                    }, 300);
                }
            });
        }
        
    }
}

function ClearRefreshInterval() {
    try {
        console.log("this is ClearRefreshInterval")
        if (intervalCheckRefreshNeeded)
        clearInterval(intervalCheckRefreshNeeded);
        intervalCheckRefreshNeeded = setInterval(CheckRefreshNeeded, 300000);//1800000 - 30mins//600000 - 10mins//900000 - 15mins//300000 - 5mins
    } catch (e) {
    }
}

function CheckRefreshNeeded() {
    if ($("#hdnCallStatus").val() != "1") {
        console.log("this is CheckRefreshNeeded")
        $.ajax({
            url: "/User/IsRefreshRequired/",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            async: false,
            success: function (data) {
                if (data.Data.ID == 1) {
                    window.location.reload();
                }
                console.log("this is CheckRefreshNeeded value:" + data.Data.ID)
            },
            complete: function () {
                setTimeout(function () {
                }, 300);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                setTimeout(function () {
                }, 300);
            }
        });
    }
    else {
        console.log("this is CheckRefreshNeeded not executed")
    }
}
var intervalCheckRefreshNeeded;
$(document).ready(function () {
    //steps.step1();      
    ShowDefaultScreen('onload ');

    if (callingPage.toLowerCase().indexOf("call") > -1)
        LoadCall();
    //setInterval(function () {
    //    CheckIfAgentInactive();
    //}, 50000);

    setInterval(function () {
        if (callingPage.toLowerCase().indexOf("call") > -1)
            InsertAccessMemberPing("KioskPing");
    }, 300000);

    setInterval(function () {
        if (callingPage.toLowerCase().indexOf("accept") > -1)
            InsertAccessMemberPing("AgentPing");

    }, 240000);

    if (callingPage.toLowerCase().indexOf("accept") > -1)
        intervalCheckRefreshNeeded = setInterval(CheckRefreshNeeded, 300000);//1800000 - 30mins//600000 - 10mins//900000 - 15mins//300000 - 5mins
});


function conversationCall() {
    BootstrapDialog.confirm({
        title: 'Notice',
        id: "divConversationCall",
        size: BootstrapDialog.SIZE_WIDE,
        message: 'Your conversation with our agent will be recorded for training and quality purposes.',
        type: BootstrapDialog.TYPE_WARNING,
        closable: false,
        draggable: false,
        btnCancelLabel: 'Reject',
        btnOKLabel: 'Accept',
        btnCancelClass: 'btn btn-danger',
        btnOKClass: 'btn btn-success',
        callback: function (result) {
            // result will be true if button was click, while it will be false if users close the dialog directly.
            if (result) {
                $("#start-call-button").click();
                //window.location.href = '/Home/Call';
                $(".call-btnContainer").css({ "display": "none" });
            }
        }
    });
}
function tnc() {
    BootstrapDialog.show({
        title: 'Terms And Conditions',
        id: "divTnC",
        size: BootstrapDialog.SIZE_EXTRAWIDE,
        type: getDialogType("PRIMARY"),
        message: function () {
            var $message = $('<div style="max-height: 1500px; overflow-y: scroll;"></div>');
            var html = '';
            html += '<div class="tnc-container" style="margin-top: 0px; box-shadow: none; padding: 0 0 0 10px;">';
            //html += '<header class= "site-header"> ';
            //html += '   <h1>Terms And Conditions</h1>';
            //html += '</header> ',
            html += '<p><strong>The User accepts this Terms and Conditions regarding access and use of the Digital Information Kiosk installed at the Airport and any services there to including without limitation features, functionalities, etc., offered by the Airport Operator.</strong></p>';
            html += '   <ol class="orderList mtop30">';
            html += '       <li>';
            html += '           <h1 class="title">Definitions</h1>';
            html += '           <p>"Airport" shall mean Adani Airport Holdings Limited;</p>';
            html += '           <p>"Airport Operator" shall mean Adani Airport Holdings Limited;</p>';
            html += '           <p>"Digital Screen(s)" shall mean touch-based Digital Information Kiosk installed at the Airport for Users to get information;</p>';
            html += '           <p>"Personal Data" shall mean the name, contact and other details provided by the User for accessing and using the Digital Screen;</p>';
            html += '           <p>"Terms" shall mean these Terms and Conditions;</p>';
            html += '           <p>"User(s)" means the person(s) who uses and access the Digital Screen(s).</p>';
            html += '       </li>';
            html += '       <li class="mtop30">';
            html += '           <h1 class="title">Access and Use of Digital Screen</h1>';
            html += '           <ul class="listDisc">';
            html += '               <li>User may access and use the Digital Screen installed at the Airport for getting information in accordance with the options as provided thereat.</li>';
            html += '               <li>In the process of interacting with the Airport Operator, User shall have the option to provide their Personal Data.</li>';
            html += '               <li>Thereafter, the conversation with the User and Airport Operator will be recorded for training and quality purposes.</li>';
            html += '           </ul>';
            html += '       </li>';
            html += '       <li class="mtop30">';
            html += '           <h1 class="title">Collection of Personal Data</h1>';
            html += '           <p>The Personal Data collected depends on how the User interacts through Digital Screen and the information provided to the Airport Operator. The User hereby consents to such collection and processing of Personal Data by the Airport Operator for its business and/ or meet its contractual and legal obligations or fulfill other legitimate interests.</p>';
            html += '       </li>';
            html += '       <li class="mtop30">';
            html += '           <h1 class="title">Use of Personal Data</h1>';
            html += '           <p>';
            html += '               Airport Operator and/ or its affiliates shall use the Personal Data for purposes described in the Terms herein. The Personal Data may be inter alia used to:',
                html += '               <ul class="listDisc">';
            html += '                   <li>provide and deliver services, including securing, troubleshooting, improving, and personalizing its products and services;</li>';
            html += '                   <li>operate and improve its business, including internal operations and security systems;</li>';
            html += '                   <li>understand User and his/ her preferences for enhancing User experience using Digital Screens;</li>';
            html += '                   <li>process User transactions;</li>';
            html += '                   <li>provide customer service and response to queries, if any;</li>';
            html += '                   <li>perform research and analysis aimed at improving its products, services and technologies;</li>';
            html += '                   <li>send information, including confirmations, invoices, technical notices, updates, security alerts, and support and administrative messages to Users;</li>';
            html += '                   <li>communicate about new products, offers, promotions, rewards, contests, upcoming events, and other information about its products and those of its selected partners; and</li>';
            html += '                   <li>display content, including advertising, that is customized to Users interests and preferences.</li>';
            html += '               </ul>';
            html += '           </p>';
            html += '           <p>In carrying out these purposes, Airport Operator may combine data collected from different sources to give Users more seamless, consistent, and personalized experience.</p>';
            html += '       </li>';
            html += '       <li class="mtop30">';
            html += '           <h1 class="title">Sharing of Personal Data</h1>';
            html += '           <p>User hereby consents for sharing the Personal Data to complete the transactions or provide the products or services requested or authorized, with third party agencies. Airport Operator may also share the Personal Data within its corporate group, including with its affiliates, and divisions, all of whom may use the Personal Data for the purposes disclosed herein.</p>';
            html += '           <p>Personal Data may also be shared with service providers who perform services on behalf of the Airport Operator. For example, Airport Operator may hire other companies to handle the processing of payments, to provide data storage, to provide technical support with respect to Digital Screens, to assist in direct marketing, analyses interests and preferences of Users and to conduct audits, etc. Those companies will be permitted to obtain only the Personal Data they need to provide the service. They are required to maintain the confidentiality of the information and are prohibited from using it for any other purpose.</p>';
            html += '           <p>Information about Users, including Personal Data, may be disclosed as part of any merger, transfer, divestiture, acquisition, or sale of all or a portion of the company and/or its assets, as well as in the unlikely event of insolvency, bankruptcy, or receivership, in which Personal Data would be transferred as one of the business assets of the company.</p>';
            html += '           <p>Airport Operator reserves the right to disclose Personal Data if required to do so by law (including to meet national security or law enforcement requirements), or in the good-faith belief that such action is reasonably necessary to comply with legal process, respond to claims, or protect the rights, property or safety of its employees, customers, or the public.</p>';
            html += '       </li>';
            html += '       <li class="mtop30">';
            html += '           <h1 class="title">Retention of Personal Data</h1>';
            html += '           <p>Personal Data may be retained by the Airport Operator even after the fulfillment of the transaction for other essential purposes such as complying with legal obligations, resolving disputes, and enforcing its agreements. Because these needs can vary for different data types in the context of different products, actual retention periods can vary significantly based on criteria such as user expectations or consent, the sensitivity of the data, the availability of automated controls that enable users to delete data, and our legal or contractual obligations.</p>';
            html += '       </li>';
            //html += '       <li class="mtop30">';
            //html += '           <h1 class="title">Social Media</h1>';
            //html += '           <p>Airport Operator may share the pictures of the Users clicked using Digital Screen with social networks like Facebook, etc. In these instances, User agrees that the data being shared is subject to the privacy policies of such social networks. Except where required by applicable law or regulation, Airport Operator does not control and does not assume any responsibility for the use of such data by social networks.</p>';
            //html += '       </li>';
            html += '       <li class="mtop30">';
            html += '           <h1 class="title">Security of Personal Data</h1>';
            html += '           <p>Airport Operator has taken appropriate and reasonable steps designed to help protect Personal Data from unauthorized access, use, disclosure, alteration, and destruction. For instance, in some cases the information in transit is encrypted using secure socket layer (SSL) technology. No method of transmission over the internet, or method of electronic storage, is 100% secure. Therefore, while Airport Operator strives to protect Personal Data, it cannot guarantee its absolute security.</p>';
            html += '       </li>';
            html += '       <li class="mtop30">';
            html += '           <h1 class="title">General</h1>';
            html += '           <div>';
            html += '               <ul class="listRoman">';
            html += '                   <li>Airport Operator reserves the right to add, change, discontinue, remove or suspend the access to Digital Screen, including its features and specifications, temporarily or permanently, at any time, without notice or intimation and without liability.</li>';
            html += '                   <li>Airport Operator reserves the right to undertake all necessary steps to ensure that the security, safety and integrity of Airport Operator\'s systems as well as its User interests are and remain, well - protected.</li>';
            html += '                   <li>Airport Operator reserves the right to change the Terms at any time it deems necessary to reflect changes in its products and services, or processing of Personal Data, or applicable law.</li>';
            html += '                   <li>Airport Operator reserves the right to take various steps to verify and confirm the authenticity, enforceability and validity of Personal Data shared by the User.</li>';
            html += '                   <li>The User shall have the option to not provide the Personal Data.</li>';
            html += '                   <li>These Terms shall be in addition to any other terms of use as provided by the Airport Operator at its website or otherwise and applicable hereto.</li>';
            html += '                   <li>The Personal Data submitted by the User may be adapted, broadcast, changed, copied, disclosed, licensed, performed, posted, published, transmitted or used by the Airport Operator anywhere in the world, in any medium, forever.</li>';
            html += '                   <li>Disputes, if any, shall be subject to Indian laws and shall be exclusively subject to the jurisdiction of the courts at India.</li>';
            html += '                   <li>These Terms are subject to the terms and conditions of the Concession Agreement between Airports Authority of India and Airport Operator dated February 14, 2020.</li>';
            html += '               </ul>';
            html += '           </div>';
            html += '       </li>';
            html += '   </ol>';
            html += '   <div class="clearfix"></div>';
            html += '</div>';
            $message.append(html);
            return $message;
        },

        closable: true,
        draggable: false,
        buttons: [
            {
                label: "Cancel",
                action: function (dialog) {
                    dialog.close();
                }
            }
        ],
        onshown: function (dialogRef) {
            //
        }
    });
}