<template>
  <TopBar />
  <main class="bg-slate-100 dark:bg-slate-500">
    <div
      class="container-fluid px-4 mx-auto bg-slate-100 dark:bg-slate-500 text-black dark:text-white py-2 border-black border-b dark:border-white"
    >
      <input type="file" id="fileForUpload" v-on:change="readFile" />
    </div>

    <div class="container mx-auto bg-slate-100 dark:bg-slate-500">
      <div class="grid grid-cols-2 min-h-screen">
        <div class="w-full border-black border-r dark:border-white py-2 px-4">
          <TreeView :treeData="treeOneData" />
        </div>
        <div class="w-full border-black border-l dark:border-white py-2 px-4">
          <TreeView :treeData="treeOneData" />
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import TopBar from "@/components/TopBar.vue";
import TreeView from "@/components/TreeView.vue";

export default {
  components: {
    TopBar,
    TreeView,
  },
  data() {
    return {
      xmlData: "",
      textData: "",
      jsonData: {},
      treeOneData: {},
    };
  },
  methods: {
    parseToTrer(jsonData) {
      const cloneforthis = this;
      const returnData = {};
      for (const key in jsonData) {
        // skip loop if the property is from prototype
        if (!jsonData.hasOwnProperty(key)) continue;

        const obj = jsonData[key];
        if (typeof obj === "object" || Array.isArray(obj)) {
          returnData[key] = this.parseToTrer(obj);
        } else {
          returnData[key] = obj;
        }
      }
      return returnData;
    },
    parseToTree(jsonData) {
      const cloneforthis = this;
      const returnData = [];


      for (const key in jsonData) {
        // skip loop if the property is from prototype
        if (!jsonData.hasOwnProperty(key)) continue;

        const obj = jsonData[key];
        if (typeof obj === "object" || Array.isArray(obj)) {
          if(typeof obj === "object"){
            returnData.push({
              text: obj.name,
              state: { checked: false, selected: false, expanded: false },
              nodes: this.parseToTree(obj.children),
            });
          }else{
            // returnData.push({
            //   text: key,
            //   state: { checked: false, selected: false, expanded: false },
            //   nodes: this.parseToTree(obj),
            // });
          }
        } else {
          returnData.push({
            text: obj +'-'+ key,
            state: { checked: false, selected: false, expanded: false },
          });
        }
      }
      return returnData;
    },
    parseTextToXML() {
      const xmlData = this.parseXml(this.textData);
      this.xmlData = xmlData;
      // console.log(this.xmlData);
      this.jsonData = this.xml2json(this.xmlData, "");
      const treeDataArray = this.parseToTree(this.jsonData);
      this.treeOneData = treeDataArray;
      console.log(this.treeOneData);
    },
    parseXml(xml) {
      let dom = null;
      if (window.DOMParser) {
        try {
          dom = new DOMParser().parseFromString(xml, "text/xml");
        } catch (e) {
          dom = null;
        }
      } else if (window.ActiveXObject) {
        try {
          dom = new ActiveXObject("Microsoft.XMLDOM");
          dom.async = false;
          if (!dom.loadXML(xml))
            // parse error ..

            window.alert(dom.parseError.reason + dom.parseError.srcText);
        } catch (e) {
          dom = null;
        }
      } else alert("cannot parse xml string!");
      return dom;
    },
    xml2json(xml, tab) {
      var X = {
        toObj: function (xml) {
          let o = {};
          if (xml.nodeType == 1) {
            // element node ..
            if (xml.attributes.length)
              // element with attributes  ..
              for (let i = 0; i < xml.attributes.length; i++)
                o["@" + xml.attributes[i].nodeName] = (
                  xml.attributes[i].nodeValue || ""
                ).toString();
            if (xml.firstChild) {
              // element has child nodes ..
              let textChild = 0,
                cdataChild = 0,
                hasElementChild = false;
              for (var n = xml.firstChild; n; n = n.nextSibling) {
                if (n.nodeType == 1) hasElementChild = true;
                else if (n.nodeType == 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/))
                  textChild++; // non-whitespace text
                else if (n.nodeType == 4) cdataChild++; // cdata section node
              }
              if (hasElementChild) {
                if (textChild < 2 && cdataChild < 2) {
                  // structured element with evtl. a single text or/and cdata node ..
                  X.removeWhite(xml);
                  for (var n = xml.firstChild; n; n = n.nextSibling) {
                    if (n.nodeType == 3)
                      // text node
                      o["#text"] = X.escape(n.nodeValue);
                    else if (n.nodeType == 4)
                      // cdata node
                      o["#cdata"] = X.escape(n.nodeValue);
                    else if (o[n.nodeName]) {
                      // multiple occurence of element ..
                      if (o[n.nodeName] instanceof Array)
                        o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                      else o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                    } // first occurence of element..
                    else o[n.nodeName] = X.toObj(n);
                  }
                } else {
                  // mixed content
                  if (!xml.attributes.length) o = X.escape(X.innerXml(xml));
                  else o["#text"] = X.escape(X.innerXml(xml));
                }
              } else if (textChild) {
                // pure text
                if (!xml.attributes.length) o = X.escape(X.innerXml(xml));
                else o["#text"] = X.escape(X.innerXml(xml));
              } else if (cdataChild) {
                // cdata
                if (cdataChild > 1) o = X.escape(X.innerXml(xml));
                else
                  for (var n = xml.firstChild; n; n = n.nextSibling)
                    o["#cdata"] = X.escape(n.nodeValue);
              }
            }
            if (!xml.attributes.length && !xml.firstChild) o = null;
          } else if (xml.nodeType == 9) {
            // document.node
            o = X.toObj(xml.documentElement);
          } else alert("unhandled node type: " + xml.nodeType);
          return o;
        },
        toJson: function (o, name, ind) {
          let json = name ? '"' + name + '"' : "";
          if (o instanceof Array) {
            for (let i = 0, n = o.length; i < n; i++)
              o[i] = X.toJson(o[i], "", ind + "\t");
            json +=
              (name ? ":[" : "[") +
              (o.length > 1
                ? "\n" + ind + "\t" + o.join(",\n" + ind + "\t") + "\n" + ind
                : o.join("")) +
              "]";
          } else if (o == null) json += (name && ":") + "null";
          else if (typeof o == "object") {
            const arr = [];
            for (const m in o) arr[arr.length] = X.toJson(o[m], m, ind + "\t");
            json +=
              (name ? ":{" : "{") +
              (arr.length > 1
                ? "\n" + ind + "\t" + arr.join(",\n" + ind + "\t") + "\n" + ind
                : arr.join("")) +
              "}";
          } else if (typeof o == "string")
            json += (name && ":") + '"' + o.toString() + '"';
          else json += (name && ":") + o.toString();

          return json;
        },
        innerXml: function (node) {
          let s = "";
          if ("innerHTML" in node) s = node.innerHTML;
          else {
            var asXml = function (n) {
              let s = "";
              if (n.nodeType == 1) {
                s += "<" + n.nodeName;
                for (let i = 0; i < n.attributes.length; i++)
                  s +=
                    " " +
                    n.attributes[i].nodeName +
                    '="' +
                    (n.attributes[i].nodeValue || "").toString() +
                    '"';
                if (n.firstChild) {
                  s += ">";
                  for (let c = n.firstChild; c; c = c.nextSibling)
                    s += asXml(c);
                  s += "</" + n.nodeName + ">";
                } else s += "/>";
              } else if (n.nodeType == 3) s += n.nodeValue;
              else if (n.nodeType == 4) s += "<![CDATA[" + n.nodeValue + "]]>";
              return s;
            };
            for (let c = node.firstChild; c; c = c.nextSibling) s += asXml(c);
          }
          return s;
        },
        escape: function (txt) {
          return txt
            .replace(/[\\]/g, "\\\\")
            .replace(/[\"]/g, '\\"')
            .replace(/[\n]/g, "\\n")
            .replace(/[\r]/g, "\\r");
        },
        removeWhite: function (e) {
          e.normalize();
          for (let n = e.firstChild; n; ) {
            if (n.nodeType == 3) {
              // text node
              if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) {
                // pure whitespace text node
                const nxt = n.nextSibling;
                e.removeChild(n);
                n = nxt;
              } else n = n.nextSibling;
            } else if (n.nodeType == 1) {
              // element node
              X.removeWhite(n);
              n = n.nextSibling;
            } // any other node
            else n = n.nextSibling;
          }
          return e;
        },
      };
      if (xml.nodeType == 9)
        // document node
        xml = xml.documentElement;
      const json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
      return JSON.parse(
        "{\n" +
          tab +
          (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) +
          "\n}"
      );
    },
    readFile() {
      const file = document.getElementById("fileForUpload").files[0];
      const cloneForThis = this;
      if (file) {
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
          cloneForThis.textData = evt.target.result;
          cloneForThis.textData = JSON.parse(cloneForThis.textData)
          let treeDataArray = cloneForThis.parseToTree(cloneForThis.textData);
          cloneForThis.treeOneData = treeDataArray;
        };
        reader.onerror = function (evt) {
          console.log(evt);
        };
      }
    },
  },
  mounted() {},
};
</script>
