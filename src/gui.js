let presets = require("./presets.json");

class GUI {

    Init(rd, container) {

        if(!guify) {
            console.log("Guify was not found! Include it on the page to show the GUI for this program.");
        }
        
        this.panel = new guify.GUI({
            title: 'Reaction-Diffusion Simulator', 
            theme: 'dark', 
            root: container,
            barMode: 'above',
            align: 'right',
            opacity: 0.95,
        });

        this.panel.Register({
            type: "select",
            label: "Preset",
            options: Object.getOwnPropertyNames(presets),
            initial: rd.rdView.selectedPreset,
            onChange: (name) => {
                rd.rdView.SetPreset(name);
                //rd.rdView.Reset();
            }
        });

        this.panel.Register({
            type: "range", label: "Feed Rate",
            min: 0.001, max: 0.1, step: 0.001,
            object: rd.rdView.computeUniforms.feed,
            property: "value"
        });

        this.panel.Register({
            type: "range", label: "Kill Rate",
            min: 0.001, max: 0.1, step: 0.001,
            object: rd.rdView.computeUniforms.kill,
            property: "value"
        });

        this.panel.Register({
            type: "range", label: "Steps Per Frame",
            min: 0, max: 50, step: 1,
            object: rd.rdView,
            property: "computeStepsPerFrame"
        });

        this.panel.Register({
            type: "range", label: "Time Scale",
            min: 0, max: 1,
            object: rd.rdView.computeUniforms.timestep,
            property: "value"
        });

        this.panel.Register({
            type: "range", label: "Brush Radius",
            min: 0.5, max: 100, step: 0.5,
            object: rd.rdView.computeUniforms.dropperSize,
            property: "value"
        });

        this.panel.Register({
            type: "button",
            label: "Reset",
            action: () => rd.rdView.Reset()
        });

        this.panel.Register({
            type: "button",
            label: "Clear",
            action: () => rd.rdView.Clear()
        });


        this.panel.Register({
            type: "folder",
            label: "Advanced"
        })

        this.panel.Register({
            type: "range", label: "Res. Scale",
            folder: "Advanced",
            min: 0.1, max: 3.0,
            object: rd.rdView,
            property: "internalResolutionMultiplier",
            onChange: () => {
                rd.rdView.ReformRenderTargets(container.offsetWidth, container.offsetHeight);
            }
        });


        this.panel.Register({
            type: "button", label: "Show/Hide FPS",
            folder: "Advanced",
            action: () => rd.ToggleDebug()
        })

    }

}

// Export "singleton" instance
export let gui = new GUI();