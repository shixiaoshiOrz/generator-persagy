// 引入生成器的父类
const Generator = require("yeoman-generator");
const Vue2Generator = require("../vue2/index.js");
const path = require("node:path");
// 导出继承的子类

const VUE2_CUSTOM_PATH = path.join(__dirname, "..", "vue2", "index.js");
module.exports = class extends Generator {
  // 构造方法可以处理自定义的命令行参数
  constructor(args, opts) {
    super(args, opts);
    // 项目文件夹 参数
    this.argument("projectName", { type: String, required: false });
    // 使用vue2旧版
    this.option("cli4", { desc: "使用旧版vue2-cli4.x", alias: "4", type: String });
    // 使用vue2新版
    this.option("cli5", { desc: "使用新版vue2-cli5.x", alias: "55", type: String });
    // 帮助
    this.option("help", { desc: "参数提示", alias: "h", type: String });
  }
  // 1.询问，获取信息
  async prompting() {
    // prompt方法返回一个promise，用于询问用户信息，并返回一个结果对象
    const projectName = this.options.projectName ?? "persagy-app";
    if (this.options.cli4) {
      return this.composeWith({ Generator: Vue2Generator, path: VUE2_CUSTOM_PATH }, [projectName, "cli4"]);
    }
    if (this.options.cli5) {
      return this.composeWith({ Generator: Vue2Generator, path: VUE2_CUSTOM_PATH }, [projectName, "cli5"]);
    }
    const answers = await this.prompt({
      type: "list",
      name: "preset",
      message: "请选择一个预设：",
      choices: [
        { name: "旧版vue2-cli4.x", value: "cli4" },
        { name: "新版vue2-cli5.x", value: "cli5" },
        { name: "自定义配置", value: "custom" },
      ],
      default: "cli5",
    });
    if (answers.preset === "cli4") {
      this.composeWith({ Generator: Vue2Generator, path: VUE2_CUSTOM_PATH }, [projectName, "cli4"]);
    } else if (answers.preset === "cli5") {
      this.composeWith({ Generator: Vue2Generator, path: VUE2_CUSTOM_PATH }, [projectName, "cli5"]);
    } else if (answers.preset === "custom") {
      this.composeWith({ Generator: Vue2Generator, path: VUE2_CUSTOM_PATH }, [projectName, "custom"]);
    } else {
      throw new Error("未定义的类型！");
    }
  }
};
