import { reactive } from 'vue'

import CurrentSong from './components/CurrentSong.vue'
import CurrentSongIcon from "./assets/icon-audio.png";

export const tasks = reactive({
    tasklist: [],
    availableApps: {
        currentSong: {
            comp: CurrentSong,
            icon: CurrentSongIcon,
            title: 'Todays song'
        },
    },
    openWindow(name) {
        const id = Math.random().toString(16).slice(2);
        this.tasklist.push({
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
        this.tasklist = this.tasklist.filter((task) => {
            return task.id != id;
        });
        this.updateZ();
    },
    toggleWindow(id) {
        this.tasklist = this.tasklist.map((task) => {
            return {
                ...task,
                isMin: task.id == id ? !task.isMin : task.isMin,
            }
        });
        this.focusWindow(id);
    },
    focusWindow(id) {
        this.tasklist.sort((a, b) => a.id == id ? 1 : 0);
        this.tasklist = this.tasklist.map((task) => ({
            ...task,
            isFocus: task.id == id ? true : false,
        }));
        this.updateZ();
    },
    updateZ() {
        this.tasklist = this.tasklist.map((task, index) => ({
            ...task,
            zLevel: 10 + index
        }))
    }
})