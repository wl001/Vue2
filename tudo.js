/**
 * Created by 王磊 on 2018/5/6.
 */
const vm = new Vue({
    el:'#box',
    data:{
        todos:[
            {isSelected:false,title:'睡觉'},
            {isSelected:false,title:'洗澡'},
        ],
        title:'',
        cur:'',
        hash:''
    },
    created(){//钩子函数
        // 初始化数据
        this.todos = JSON.parse(localStorage.getItem('data'))  || this.todos
        //监控hash变化 监控页面跳转信息  如果页面有hash值了 重新刷新页面也要获取hash指
        this.hash = window.location.hash.slice(2) || 'all '
        window.addEventListener('hashchange',()=>{
           // console.log(window.location.hash)
            //当hash变化重新操作记录数据
            this.hash = window.location.hash.slice(2)
        },false)
    },
    watch:{//watch默认值监控一层数据变化,要深度监控
        todos:{
            handler(){
                //localStorage存储的是字符串 JSON.stringify转换
               localStorage.setItem('data', JSON.stringify(this.todos));
            },
            deep:true
        }
    },
    computed:{
        count(){//过滤出isSelecter是false的长度
            //filter(item=>item.isSelected == false).length
          return this.todos.filter(item=>!item.isSelected).length
        },
        filterTodos(){//点击导航过滤出新的todos数据
            if(this.hash === 'all'){
                return this.todos
            }
            if(this.hash === 'finish'){
                return this.todos.filter(item=>item.isSelected)
            }
            if(this.hash === 'unfinish'){
                return this.todos.filter(item=>!item.isSelected)
            }
            return this.todos

        }
    },
    methods:{
        add(){
            this.todos.push({
                isSelected:false,
                title:this.title
            })
            this.title =''
        },
        del(i){
            //不等于i的过滤留下
            this.todos = this.todos.filter(item=>item!==i)
        },
        remember(todo){//当前传递的是todo(当前点击的这一项)
            this.cur=todo;//当前点击的li的值等于循环中莫一项li的数据
        },
        cancel(){
            this.cur='';
        }
    },
    directives:{
        focus(el,bindings){
           if(bindings.value){
              alert(1)
               el.focus();
           }
        }
    }
});