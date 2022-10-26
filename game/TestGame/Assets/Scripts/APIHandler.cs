using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using TMPro;
using UnityEngine.UI;
using UnityEngine.Events;
using System.Runtime.InteropServices;

public class APIHandler : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void RequestAuth();
    public TextMeshProUGUI output;
    public UnityEvent requestAuth = new UnityEvent();

    public TMP_InputField uri;
    public TMP_Dropdown method;
    public TMP_InputField headers;
    public TMP_InputField body;

    private string[] availMethods = {"GET", "POST", "DELETE"};
    private string url = "https://j9fcxaqaqb.execute-api.ap-northeast-2.amazonaws.com/staging";
    
    [System.Serializable]
    public class UserAuth 
    {
        public string eth_address;
        public string eth_timestamp;
        public string eth_signature;
    }
    public UserAuth userData;

    public void Submit()
    {
        UnityWebRequest request = new UnityWebRequest(url + uri.text, availMethods[method.value]);
        request = AttachHeaders(request, headers.text);
        if(body.text != "")
        {
            request = AttachBody(request, body.text);
        }
        request.downloadHandler = new DownloadHandlerBuffer();
        request.disposeDownloadHandlerOnDispose = true;

        // Send Request
        StartCoroutine(SubmitRequest(request));
        Debug.Log("Request Sent");
    }

    public UnityWebRequest AttachHeaders(UnityWebRequest request, string head)
    {
        string[] listHeaders = head.Split(',');

        foreach (var item in listHeaders)
        {
            int index = item.IndexOf(':');
            if(index == -1 || index+1 == item.Length) {continue;}
            
            request.SetRequestHeader(
                item.Substring(0, index),
                item.Substring(index+1)
            );
        }

        if(userData.eth_address != null && userData.eth_timestamp != null && userData.eth_signature != null)
        {
            request.SetRequestHeader("eth_address", userData.eth_address);
            request.SetRequestHeader("eth_timestamp", userData.eth_timestamp);
            request.SetRequestHeader("eth_signature", userData.eth_signature);
        }
        
        return request;
    }

    public UnityWebRequest AttachBody(UnityWebRequest request, string data)
    {
        byte[] payload = System.Text.Encoding.UTF8.GetBytes(data);
        UploadHandlerRaw uh = new UploadHandlerRaw(payload);
        uh.contentType = "application/json";
        request.uploadHandler = uh;
        request.disposeUploadHandlerOnDispose = true;
        
        return request;
    }

    IEnumerator SubmitRequest(UnityWebRequest request)
    {
        yield return request.SendWebRequest();

        if(request.error != null)
        {
            Debug.Log(request.error);
            output.text = "Output: " + request.error;
        } else
        {
            Debug.Log(request.result);
            string res = request.downloadHandler.text;
            output.text = "Output: " + res;
        }
        request.Dispose();
    }

    // Request authentication data from browser
    public void RequestAuthentication()
    {
        #if UNITY_WEBGL == true && UNITY_EDITOR == false
        RequestAuth();
        #endif
    }

    // Receive authentication data from browser
    public void ReceiveAuthentication(string input)
    {
        userData = JsonUtility.FromJson<UserAuth>(input);
        output.text = "Output: " + "Authentication data received.";
    }
}
