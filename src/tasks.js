import { shallowReactive } from 'vue';

import CurrentSong from './components/apps/CurrentSong.vue';
import CurrentSongIcon from './assets/icon-audio.png';
import JokeMachine from './components/apps/JokeMachine.vue';
import JokeMachineIcon from './assets/icons/printer-0.png';

export const tasks = shallowReactive({
    taskList: [],
    availableApps: {
        currentSong: {
            comp: CurrentSong,
            icon: CurrentSongIcon,
            title: 'Todays song',
            loc_x: 0,
            loc_y: 0
        },
        jokeMachine: {
            comp: JokeMachine,
            icon: JokeMachineIcon,
            title: 'Joke Machine',
            loc_x: 1,
            loc_y: 0
        }
    },
    getTaskById(id) {
        return this.taskList.find((task) => task.id == id) || null;
    },
    openWindow(name) {
        const id = Math.random().toString(16).slice(2);
        this.taskList.push({
            id: id,
            isMin: false,
            isFocus: true,
            comp: this.availableApps[name].comp,
            title: this.availableApps[name].title,
            icon: this.availableApps[name].icon,
        });
        this.focusWindow(id);
    },
    closeWindow(id) {
        this.taskList = this.taskList.filter((task) => {
            return task.id != id;
        });
        this.updateZ();
    },
    toggleWindow(id) {
        this.taskList = this.taskList.map((task) => {
            return {
                ...task,
                isMin: task.id == id ? !task.isMin : task.isMin,
            }
        });
        this.focusWindow(id);
    },
    focusWindow(id) {
        this.taskList.sort((a, b) => a.id == id ? 1 : 0);
        this.taskList = this.taskList.map((task) => ({
            ...task,
            isFocus: task.id == id ? true : false,
        }));
        this.updateZ();
    },
    updateZ() {
        this.taskList = this.taskList.map((task, index) => ({
            ...task,
            zLevel: 10 + index
        }))
    }
})