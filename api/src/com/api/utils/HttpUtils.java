package com.api.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLDecoder;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.KeyManager;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
/**
 * 
 * @author dk
 *
 */
public class HttpUtils {
 
   private static Logger log = LoggerFactory.getLogger(HttpUtils.class);
   private static final int BUFFER_SIZE = 1024;
   public static final String CONTENT_TYPE_OF_APPLICATION_JSON = "application/json";
 
   public static String doHttpPost(String postUrl, Map<String, String> headers, 
		   String contentType, KeyManager[] keyManagers, int... readTimeoutSeconds) {
      try {
 
         HttpURLConnection conn = (HttpURLConnection) new URL(postUrl).openConnection();
         conn.setDoInput(true);
         conn.setUseCaches(false);
         if (contentType != null && !contentType.equals("")) {
            conn.setRequestProperty("Content-Type", contentType);
         }
         conn.setRequestMethod("GET");
         conn.setRequestProperty("Cache-Control", "no-cache");
         conn.setRequestProperty("connection", "Keep-Alive");
         if (headers != null && !headers.isEmpty()) {
            for (String key : headers.keySet()) {
               conn.setRequestProperty(key, headers.get(key));
            }
         }
         if (readTimeoutSeconds != null && readTimeoutSeconds.length > 0) {
            conn.setReadTimeout(readTimeoutSeconds[0] * 1000);
         }
 
         boolean isHttpsRequest = postUrl.toLowerCase().startsWith("https");
         // 对于https请求需要添加证书管理者
         if (isHttpsRequest) {
            // 创建SSLContext对象，并使用我们指定的信任管理器初始化
            TrustManager[] tm = { new MyX509TrustManager() };
            SSLContext sslContext = SSLContext.getInstance("TLS");
            sslContext.init(keyManagers, tm, new java.security.SecureRandom());
            // 从上述SSLContext对象中得到SSLSocketFactory对象
            SSLSocketFactory ssf = sslContext.getSocketFactory();
            // 设置请求方式（GET/POST）
            ((HttpsURLConnection) conn).setSSLSocketFactory(ssf);
         }
 
         conn.connect();
 
         // 将返回的输入流转换成字符串
         InputStream inputStream = conn.getInputStream();
         InputStreamReader inputStreamReader = new InputStreamReader(inputStream, "UTF-8");
         BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
         StringBuffer buffer = new StringBuffer();
         String str = null;
         while ((str = bufferedReader.readLine()) != null) {
            buffer.append(str);
         }
 
         // 释放资源
         bufferedReader.close();
         inputStreamReader.close();
         inputStream.close();
         inputStream = null;
 
         // 断开连接
         conn.disconnect();
 
         return buffer.toString();
      } catch (MalformedURLException e) {
         log.error("doHttpPost MalformedURLException error:{}", e);
      } catch (KeyManagementException e) {
         log.error("doHttpPost KeyManagementException error:{}", e);
      } catch (NoSuchAlgorithmException e) {
         log.error("doHttpPost NoSuchAlgorithmException error:{}", e);
      } catch (IOException e) {
         log.error("doHttpPost IOException error:{}", e);
      } catch (Exception e) {
         log.error("doHttpPost Exception error:{}", e);
      }
      return null;
   }
 
   /**
    * 从request中获得参数Map，并返回可读的Map
    * 
    * @param request
    * @return
    */
   @SuppressWarnings({ "unchecked", "rawtypes", "deprecation" })
   public static Map<String, String> getParameterMap(HttpServletRequest request) {
      Map returnMap = new HashMap();
      Map properties = request.getParameterMap();
      Iterator iterator = properties.entrySet().iterator();
      String value = "";
      while (iterator.hasNext()) {
         Map.Entry entry = (Map.Entry) iterator.next();
         Object valueObj = entry.getValue();
         if (valueObj instanceof String[]) {
            String[] values = (String[]) valueObj;
            value = StringUtils.join(values, ",");
         } else {
            value = null != valueObj ? valueObj.toString() : "";
         }
         returnMap.put((String) entry.getKey(), URLDecoder.decode(value));
      }
      return returnMap;
   }
 
   /*public static <T> T getBeanFromRequest(HttpServletRequest request, Class<T> clazz) {
      return getBeanFromMap(getParameterMap(request), clazz);
   }*/
 
   /*public static <T> T getBeanFromMap(Map<String, String> map, Class<T> clazz) {
      String gson = StringUtils.getGson(true).toJson(map);
      try {
         return StringUtils.getGson(true).fromJson(gson, clazz);
      } catch (Exception e) {
         log.error("getBeanFromMap error:{}", e);
      }
      return null;
   }*/
 
 
   public static String map2KVPair(Map<String, String> map) {
      StringBuffer sb = new StringBuffer();
      int i = 0;
      for (String k : map.keySet()) {
         if (i++ > 0) {
            sb.append("&");
         }
         sb.append(k).append("=").append(map.get(k));
      }
      return sb.toString();
   }
 
}
 
class MyX509TrustManager implements X509TrustManager {
 
   @Override
   public void checkClientTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {
   }
 
   @Override
   public void checkServerTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {
   }
 
   @Override
   public X509Certificate[] getAcceptedIssuers() {
      return null;
   }
 
}