/****************************
原脚本作者@小白脸 脚本修改@chengkongyiban
感谢@xream 的指导
说明
   t&zd; = {  , }  花括号中的逗号

***************************/
const isSurgeiOS = 'undefined' !== typeof $environment && $environment['surge-version'];
const isShadowrocket = 'undefined' !== typeof $rocket;
const modStore = "https://loon-gallery.vercel.app/";

var name = "";
var desc = "";
let req = $request.url.replace(/plugin/,'plugin');
let urlArg = $request.url.replace(/.+plugin(\?.*)/,'$1');

if (urlArg === ""){
	name = req.match(/.+\/(.+)\.(conf|js|snippet|txt)/)?.[1] || '无名';
    desc = req.match(/.+\/(.+)\.(conf|js|snippet|txt)/)?.[1] || '无名';
}else{
	if(urlArg.match("n=")){
		name = urlArg.split("n=")[1].split("&")[0];
	}else{
		name = req.match(/.+\/(.+)\.(conf|js|snippet|txt)/)?.[1] || '无名';
	}
	if(urlArg.match("d=")){
		desc = urlArg.split("d=")[1].split("&")[0];
	}else{
		desc = name;
	}
};
name = "#!name=" + decodeURIComponent(name);
desc = "#!desc=" + decodeURIComponent(desc);

!(async () => {
  let body = await http(req);

	body = body.match(/[^\n]+/g);
let plugin = [];
let MapLocal = [];
//let MITM = [];

body.forEach((x, y, z) => {
	x = x.replace(/^(#|;|\/\/)/,"#").replace(" _ reject"," - reject")
	if (x.match(/\x20-\x20reject-/)){

				z[y - 1]?.match("#") && MapLocal.push(z[y - 1]);
				
				let dict2Mock = x.match('dict') ? '"https://raw.githubusercontent.com/mieqq/mieqq/master/reject-dict.json"' : '';
				
				let array2Mock = x.match('array') ? '"https://raw.githubusercontent.com/mieqq/mieqq/master/reject-array.json"' : '';
				
				let two002Mock = x.match('200') ? '"https://raw.githubusercontent.com/mieqq/mieqq/master/reject-200.txt"' : '';
				
				let img2Mock = x.match('img') ? '"https://raw.githubusercontent.com/mieqq/mieqq/master/reject-img.gif"' : '';
				
				MapLocal.push(x.replace(/(#)?(.+?)\x20-\x20reject-.+/, `$1$2 data=${dict2Mock}${array2Mock}${two002Mock}${img2Mock}`));
		
	}else{if (x.match(/^(DOM|U|IP|GEO)[^,]+,[^,]+,.+/)){
		plugin.push(x)
	}else{
	plugin.push(x.replace(/^(DOM|USER|URL|IP|GEO)[^,]+,[^,]+[^,]$/,""))
	};
		
	};
		
}); //循环结束

plugin = (plugin[0] || '') && `${plugin.join("\n\n")}`;
MapLocal = (MapLocal[0] || '') && `\n\n[Map Local]\n\n${MapLocal.join("\n\n")}`;

body = `${plugin}
${MapLocal}`
		.replace(/\[Rewrite\]/gi,'\n[URL Rewrite]\n')
		.replace(/\[MITM\]/gi,'\n[MITM]\n')
		.replace(/\[Script\]/gi,'\n[Script]\n')
		.replace(/\[Rule\]/gi,'\n[Rule]\n')
		.replace(/\[General\]/gi,'\n[General]\n')
		.replace(/(.+)\x20(302|307)\x20(.+)/gi,"$1 $3 $2")
		.replace(/hostname\x20?=\x20?(.+)/gi,"hostname = %APPEND% $1")
		.replace(/skip-proxy\x20?=\x20?(.+)/gi,"skip-proxy = %APPEND% $1")
		.replace(/bypass-tun\x20?=\x20?(.+)/gi,"tun-excluded-routes = %APPEND% $1")
		.replace(/real-ip\x20?=\x20?(.+)/gi,"always-real-ip = %APPEND% $1")
		.replace(/\x20{2,}/gi,' ')
		.replace(/"{2,}/g,'"')
		.replace(/(#.+\n)\n/g,'$1')
		.replace(/\n{2,}/g,'\n\n')
		.replace(/hostname\x20=\x20%APPEND%\x20\n\n安装失败\n\n1、请检查模块商店是否安装\n\n2、请检查是否开启HTTPS解密\n\n小火箭开启HTTPS解密教程https:\/\/t\.me\/h5683577\/3\n\nSurge开启HTTPS解密\(MITM\)教程https:\/\/t\.me\/h5683577\/135/,"hostname = %APPEND% \n\n模块商店已成功安装!!!")
		
if (isSurgeiOS) {
         if (body.match("验证结果↓↓↓") != null && body.match("请检查模块商店是否安装") == null)  {
			 $notification.post("已成功安装模块商店","点击通知跳转模块商店","https://loon-gallery.vercel.app/",{url:modStore})
		}else{};
		}else{
			if (body.match("验证结果↓↓↓") != null && body.match("请检查模块商店是否安装") == null)  {
			 $notification.post("已成功安装模块商店","点击通知跳转模块商店","https://loon-gallery.vercel.app/",modStore)
		}else{};
		};		
		

 $done({ response: { status: 200 ,body:body ,headers: {'Content-Type': 'text/plain; charset=utf-8'} } });

})()
.catch((e) => {
		$notification.post(`${e}`,'','');
		$done()
	})


function http(req) {
  return new Promise((resolve, reject) =>
    $httpClient.get(req, (err, resp,data) => {
  resolve(data)
  })
)
}