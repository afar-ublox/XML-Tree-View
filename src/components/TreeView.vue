<template>
  <Tree id="my-tree-id" ref="my-tree-ref" :nodes="treeData" :custom-styles="myCustomStyles"></Tree>
</template>
<script>
import Tree from "vuejs-tree";

export default {
  components: {
    Tree,
  },
  props: ['treeData'],
  data: function () {
    return {
      treeDisplayData: [
        {
          text: "Root 1",
          state: { checked: false, selected: false, expanded: false },
          nodes: [
            {
              text: "Child 1",
              state: { checked: false, selected: false, expanded: false },
              nodes: [
                {
                  text: "Grandchild 1",
                  state: { checked: false, selected: false, expanded: false },
                },
                {
                  text: "Grandchild 2",
                  state: { checked: false, selected: false, expanded: false },
                },
              ],
            },
            {
              text: "Child 2",
              state: { checked: false, selected: false, expanded: false },
            },
          ],
        },
        {
          text: "Root 2",
          state: { checked: false, selected: false, expanded: false },
        },
      ],
    };
  },
  computed: {
    myCustomStyles() {
      return {
        tree: {
          style: {
            height: "auto",
            maxHeight: "300px",
            overflowY: "visible",
            display: "inline-block",
            textAlign: "left",
          },
        },
        row: {
          style: {
            width: "500px",
            cursor: "pointer",
          },
          child: {
            class: "",
            style: {
              height: "35px",
            },
            active: {
              class: "custom_row_active_class",
              style: {
                height: "35px",
              },
            },
          },
        },
        addNode: {
          class: "custom_class",
          style: {
            color: "#007AD5",
          },
        },
        editNode: {
          class: "custom_class",
          style: {
            color: "#007AD5",
          },
        },
        deleteNode: {
          class: "custom_class",
          style: {
            color: "#EE5F5B",
          },
        },
        selectIcon: {
          class: "custom_class",
          style: {
            color: "#007AD5",
          },
          active: {
            class: "custom_class",
            style: {
              color: "#2ECC71",
            },
          },
        },
        text: {
          class: "text-black dark:text-white ml-2",
          active: {
            style: {
              "font-weight": "bold",
            },
            class: "text-red",
          },
          
        },
      };
    },
    myCustomOptions() {
      return {
        treeEvents: {
          expanded: {
            state: true,
            fn: null,
          },
          collapsed: {
            state: false,
            fn: null,
          },
          selected: {
            state: false,
            fn: null,
          },
          checked: {
            state: true,
            fn: this.myCheckedFunction,
          },
        },
        events: {
          expanded: {
            state: true,
            fn: null,
          },
          selected: {
            state: false,
            fn: null,
          },
          checked: {
            state: false,
            fn: null,
          },
          editableName: {
            state: false,
            fn: null,
            calledEvent: null,
          },
        },
        addNode: { state: false, fn: null, appearOnHover: false },
        editNode: { state: true, fn: null, appearOnHover: true },
        deleteNode: { state: true, fn: null, appearOnHover: true },
        showTags: true,
      };
    },
  },
  methods: {
    myCheckedFunction(...options) {
      console.log(options);
    },
  },
};
</script>
