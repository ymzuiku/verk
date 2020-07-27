var renderer = new marked.Renderer();

var mermaidCache = {};

renderer.code = function (code, language, isEscaped) {
  if (code && language === "mermaid") {
    var lastHtml = mermaidCache[code];
    if (lastHtml) {
      return `<div style="opacity: 1; text-align:center; transition: opacity 0.1s ease-out; min-height: 10px; padding:10px 0px; overflow:auto; border:0.6px solid #eeeeee; border-radius:6px; margin:10px 0px;">${lastHtml}</div>`;
    }

    return `<div data-code="${code}" style="opacity: 0; text-align:center; transition: opacity 0.1s ease-out; min-height: 10px; padding:10px 0px; overflow:auto; border:0.6px solid #eeeeee; border-radius:6px; margin:10px 0px;" class="mermaid">${code}</div>`;
  }
  const id = $verk.uuid();

  const [lan, opt] = language.split("::");
  let options;
  if (opt) {
    options = new Function("return " + opt)();
  }
  window[id] = {
    code,
    view: false,
    ...options,
  };
  return `<v-new props="${id}" src="${window.vanillaMarkdownDir}/monaco_verk_editor_design.html"></v-new>`;

  // if (code && lan === "html") {
  //   return `<v-new props="${id}" src="${window.vanillaMarkdownDir}/monaco_verk_editor_design.html"></v-new>`;
  // }
  // if (code) {
  //   return `<v-new props="${id}" src="${window.vanillaMarkdownDir}/monaco_verk_editor_design.html"></v-new>`;
  // }
  // return "<pre><code>" + code + "</code></pre>";
};

function VanillaMarkdown(view, md, mocLevel, mocFirst) {
  var moc = [];

  if (mocLevel) {
    window.vmd_moc_click = (i) => {
      if (moc && moc[i] && moc[i].onClick) {
        moc[i].onClick(moc[i].index, moc[i].line);
      }
    };

    // 计算每个 header在第几行
    var lines = [];
    md.split("\n").forEach((v, i) => {
      if (v[0] === "#") {
        lines.push(i);
      }
      return v;
    });

    let index = -1;
    renderer.heading = (text, level, raw, slugger) => {
      index += 1;
      moc.push({
        text,
        raw,
        level,
        index,
        line: lines[index],
      });
      return `<h${level} onclick="vmd_moc_click(${index})" class="moc-${index}">${text}</h${level}>`;
    };
  }
  view.style.position = "relative";
  view.style.overflowX = "visible";
  const main = document.createElement("div");
  main.innerHTML = marked(md, {
    renderer,
    xhtml: true,
  });
  main.querySelectorAll("*").forEach(function (el) {
    el.classList.add("vmdb");
  });
  view.style.scrollBehavior = "smooth";
  view.moc = moc;
  if (!mocFirst) {
    view.append(main);
  }
  if (view.moc.length) {
    var list = document.createElement("div");
    view.moc.forEach(function (item) {
      if (item.level > mocLevel) {
        return;
      }
      var el = document.createElement("div");
      el.textContent = "[" + (item.index + 1) + "] " + item.text;
      el.className = "vmdb-list-item vmdb-list-v" + item.level;
      el.onclick = function () {
        var mv = view.querySelector(".moc-" + item.index);
        if (mv) {
          mv.scrollIntoView();
        }
      };
      item.onClick = el.onclick;
      list.append(el);
    });
    list.className = "vmdb-list";
    view.append(list);
  }
  if (mocFirst) {
    view.append(main);
  }

  setTimeout(() => {
    try {
      var nodeList = view.querySelectorAll(".mermaid");
      mermaid.init(nodeList);
      nodeList.forEach((v) => {
        var code = v.getAttribute("data-code");
        var html = v.innerHTML;
        if (code) {
          mermaidCache[code] = html;
        }
      });

      nodeList.forEach(function (ele) {
        ele.style.opacity = 1;
        ele.style.minHeight = "auto";
      });
    } catch (err) {
      console.warn("[mermaid]: ", err);
    }
  }, 50);

  return view;
}

// window.VanillaMarkdown = VanillaMarkdown;
