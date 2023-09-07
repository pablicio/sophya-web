<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-3 sidebar">
          <div class="logo">
            <img src="@/assets/logo-youse.png" />
            <div class="tools">
              <button class="btn" @click="collapseAll" v-if="controlCollapse"><font-awesome-icon
                  icon="folder-open" /></button>
              <button class="btn" @click="collapseAll" v-else><font-awesome-icon icon="folder" /></button>
            </div>
          </div>

          <dx-tree-view id="treeView" :ref="treeViewRef" :data-source="items" display-expr="name" expand-event="click"
            item-template="item-template" :search-enabled="true" search-mode="contains" selectionMode="single"
            :select-by-click="true" @item-expanded="selectitem" @item-click="selectitem" no-data-text="Nenhum resultado">

            <template #item-template="item">
              {{ item.data.name }}
            </template>
          </dx-tree-view>
        </div>

        <div class="col-9 content">
          <!-- <swagger-render :collection="'https://raw.githubusercontent.com/swagger-api/swagger-samples/master/java/inflector-dropwizard/src/main/swagger/swagger.yaml'" /> -->
          <md-render :source="sourceMd"></md-render>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: {},
      currentItem: this.items,
      mdContent: '',
      treeViewRef: '',
      tree: '',
      controlCollapse: false,
      change: false,
      sourceMd: ''
    }
  },
  mounted() {
    this.tree = this.$refs[this.treeViewRef];

    fetch("http://35.90.20.195:8080/map_folder.json")
      .then(response => response.json())
      .then(data => {
        this.items = data
        this.getMarkdowFile(data[0])
      });
  },
  methods: {
    selectitem(e) {
      this.controlCollapse = true
      let el = document.getElementsByClassName("dx-state-selected")[0]
      el ? el.classList.remove('dx-state-selected') : null
      this.currentItem = e.itemData;
      this.getMarkdowFile(this.currentItem)
    },
    collapseAll() {
      this.controlCollapse = false
      this.collapseChildren(this.tree.instance.getNodes(), this.tree);
    },
    collapseChildren(nodes, tree) {
      nodes.forEach(node => {
        if (node.children.length) {
          this.collapseChildren(node.children, tree);
          tree.instance.collapseItem(node.key);
        }
      })
    },
    getMarkdowFile(currentItem) {
      fetch(`http://35.90.20.195:8080${currentItem.path}/${currentItem.md_slug}`)
        .then(response => response.text())
        .then((mdText) => {
          this.sourceMd = mdText
        })
    }
  }
}
</script>

<style>
#treeView,
#item-details {
  display: inline-block;
  width: 300px;
}

#markdown-details {
  vertical-align: top;
  width: 400px;
  height: 420px;
  margin-left: 20px;
}

#item-details {
  vertical-align: top;
  width: 400px;
  height: 420px;
  margin-left: 20px;
}

#item-details>img {
  border: none;
}

#item-details>.name,
#item-details>.price {
  text-align: center;
  font-size: 24px;
}

.logo {
  height: 60px;
  margin-top: 17px;
  margin-bottom: 26px;
}

.logo img {
  width: 203px;
  margin-left: 47px;
}

.container {
  margin-top: 6px;
  margin-left: 4px;
}

.dx-treeview-with-search>.dx-scrollable {
  position: fixed;
  top: 220px;
  left: 0px;
  max-height: 450px;
  overflow-y: auto;
  margin-left: 18px;
  width: 300px;
  margin-top: -55px;
}

.dx-treeview-toggle-item-visibility.dx-treeview-toggle-item-visibility-opened,
.dx-treeview-toggle-item-visibility {
  left: 86%;
}

.dx-treeview-search {
  top: 15px;
  /* display: none; */
}

.content {
  position: absolute;
  right: 0px;
}

.sidebar {
  position: fixed;
  top: 0px;
  left: 0px;
}
</style>
