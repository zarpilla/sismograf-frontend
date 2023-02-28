<template>
  <div class="svg-container">
    <div class="svg-wheel-result" id="svg-guide-wheel"></div>
    <div
      class="svg-wheel-global"
      :style="`top: ${width / 2 - 60}px; left: ${width / 2 - 60}px`"
    >
      <div class="text-inner" id="svg-guide-global"></div>
    </div>
  </div>
</template>
<script>
import axios from "~/plugins/axios";
import { mapGetters } from "vuex";

export default {
  props: {},
  data() {
    return {
      width: 1000,
      color1: "#F3C857",
      domains: [],
      colors: [
        "#A71F1F",
        "#CE542E",
        "#DA8344",
        "#E1BB59",
        "#5F925F",
        "#76B3A8",
        "#508DA8",
        "#3B4174",
      ],
      colors01: [
        "rgba(167, 31, 31, 1)",
        "rgba(206, 84, 46, 1)",
        "rgba(218, 131, 68, 1)",
        "rgba(225, 187, 89, 1)",
        "rgba(95, 146, 95, 1)",
        "rgba(118, 179, 168, 1)",
        "rgba(80, 141, 168, 1)",
        "rgba(59, 65, 116, 1)",
      ],
      colors06: [
        "rgba(167, 31, 31, 0.6)",
        "rgba(206, 84, 46, 0.6)",
        "rgba(218, 131, 68, 0.6)",
        "rgba(225, 187, 89, 0.6)",
        "rgba(95, 146, 95, 0.6)",
        "rgba(118, 179, 168, 0.6)",
        "rgba(80, 141, 168, 0.6)",
        "rgba(59, 65, 116, 0.6)",
      ],
      colors03: [
        "rgba(167, 31, 31, 0.3)",
        "rgba(206, 84, 46, 0.3)",
        "rgba(218, 131, 68, 0.3)",
        "rgba(225, 187, 89, 0.3)",
        "rgba(95, 146, 95, 0.3)",
        "rgba(118, 179, 168, 0.3)",
        "rgba(80, 141, 168, 0.3)",
        "rgba(59, 65, 116, 0.3)",
      ],
      colorsOff: [
        "rgba(179, 175, 164, 0.8)",
        "rgba(179, 175, 164, 0.4)",
        "rgba(179, 175, 164, 0.2)",
        "rgba(179, 175, 164, 0.2)",
      ],
      colorsOff0: [
        "rgba(179, 175, 164, 1)",
        "rgba(179, 175, 164, 0.4)",
        "rgba(179, 175, 164, 1)",
        "rgba(179, 175, 164, 0.4)",
      ],
      colorsOff1: [
        "rgba(179, 175, 164, 0.6)",
        "rgba(179, 175, 164, 0.2)",
        "rgba(179, 175, 164, 0.6)",
        "rgba(179, 175, 164, 0.2)",
      ],
      colorsOn0: [
        "rgba(103, 160, 185, 1)",
        "rgba(189, 224, 217, 1)",
        "rgba(235, 147, 139, 1)",
        "rgba(216, 180, 177, 1)",
      ],
      colorsOn1: [
        "rgba(103, 160, 185, 0.6)",
        "rgba(189, 224, 217, 0.6)",
        "rgba(235, 147, 139, 0.6)",
        "rgba(216, 180, 177, 0.6)",
      ],
    };
  },
  computed: {
    ...mapGetters({
      application: "app/get",
    }),
    principlesValues() {
      const principles = [];
      let c = 0;
      this.domains.forEach((d, i) => {
        d.principles.forEach((p, j) => {
          principles.push({
            label: `p${3 * i + j}v`,
            description: `${j + 1}. ${p.name}`,
            descriptionText: p.description || p.name,
            value: 100,
            quadrant: i,
            id: p.id,
          });
          principles.push({
            label: `p${3 * i + j}`,
            value: 0,
          });
          c++;
        });
      });
      for (let i = principles.length / 2; i < 12; i++) {
        principles.push({
          label: `p${i}v`,
          description: "",
          value: null,
          hidden: true,
        });
        principles.push({ label: `p${i}`, value: null, hidden: true });
      }
      return principles;
    },
    patternsValues() {
      const patterns = [];
      let c = 0;
      let acc = 0;
      this.domains.forEach((d, i) => {
        d.principles.forEach((p, j) => {
          p.patterns.forEach((pt, k) => {
            patterns.push({
              label: `pt${c}v`,
              description: `${pt.name}`,
              value: 30 / p.patterns.length,
              len: p.patterns.length,
              acc: acc + 30 / p.patterns.length,
              quadrant: i,
              id: pt.id,
            });
            patterns.push({
              label: `pt${c}`,
              value: 0,
            });
            c++;
            acc += 30 / p.patterns.length;
          });
        });
      });
      return patterns;
    },
  },
  async created() {},
  async mounted() {
    const templateId = this.application.attributes.guide_template.data.id;

    var { data } = await this.$axios.get(
      `/templates/indicators/${templateId}?locale=${this.$i18n.locale}`
    );

    this.domains = data.data.attributes.domains;

    // const container = document.getElementById("container-guide-wheel");
    // if (container && container.clientWidth) {
    //   this.width = container.clientWidth;
    // }

    this.draw();
    const svg = document.getElementById("svg-guide-wheel");

    svg.querySelector("svg").style.width = this.width;
    svg.querySelector("svg").style.height = this.height;

    const slices = svg.querySelectorAll("path.slice-x");

    const globalText = document.getElementById("svg-guide-global");
    // console.log('slices', slices)
    slices.forEach((e) => {
      e.addEventListener("mouseover", (evt) => {
        // console.log('evt', evt)
        if (evt && evt.target) {
          if (evt.target.dataset.quadrant) {
            evt.target.dataset.fill = evt.target.style.fill;
            evt.target.style.fill = evt.target.dataset.fillhover;
          }
          if (
            evt.target.dataset.id &&
            evt.target.dataset.type &&
            evt.target.dataset.type === "domain"
          ) {
            const d = this.domains.find((d) => d.id == evt.target.dataset.id);
            globalText.innerHTML = d.description;
          }
          if (
            evt.target.dataset.id &&
            evt.target.dataset.type &&
            evt.target.dataset.type === "principle"
          ) {
            const d = this.principlesValues.find(
              (d) => d.id == evt.target.dataset.id
            );
            globalText.innerHTML = d.descriptionText || d.description;
          }
          if (
            evt.target.dataset.id &&
            evt.target.dataset.type &&
            evt.target.dataset.type === "pattern"
          ) {
            const d = this.patternsValues.find(
              (d) => d.id == evt.target.dataset.id
            );
            globalText.innerHTML = d.description;
          }
        }
      });
      e.addEventListener("mouseout", (evt) => {
        if (evt && evt.target) {
          if (evt.target.dataset.fill) {
            evt.target.style.fill = evt.target.dataset.fill;
          }
        }
      });
    });
  },
  methods: {
    draw() {
      var svg = d3.select("#svg-guide-wheel").append("svg");
      svg.attr("width", width);
      svg.attr("height", height);
      var svg = svg.append("g");
      svg.append("g").attr("class", "slices");
      svg.append("g").attr("class", "slices2");
      svg.append("g").attr("class", "slices3");
      svg.append("g").attr("class", "slices-principles");
      svg.append("g").attr("class", "slices-patterns");
      svg.append("g").attr("class", "slices-principles-values");
      svg.append("g").attr("class", "slices-principles-border");
      svg.append("g").attr("class", "slices-alert");
      svg.append("g").attr("class", "global");
      svg.append("g").attr("class", "global-pct");
      svg.append("g").attr("class", "global-dragon");
      svg.append("g").attr("class", "labels");
      svg.append("g").attr("class", "labels-pct");
      svg.append("g").attr("class", "labels-principles");
      svg.append("g").attr("class", "labels-principles-values");
      svg.append("g").attr("class", "labels-patterns");
      svg.append("g").attr("class", "dragons");
      svg.append("g").attr("class", "lines");

      var width = 1000,
        height = 1000,
        radius = Math.min(width, height) / 2 - 10;

      var pie = d3.layout
        .pie()
        .sort(null)
        .value(function (d) {
          return d.value;
        });
      var arc = d3.svg
        .arc()
        .outerRadius(radius * 0.4)
        .innerRadius(radius * 0.2);
      var arc2 = d3.svg
        .arc()
        .innerRadius(radius * 0.2)
        .outerRadius(radius * 0.24);
      var arc3 = d3.svg
        .arc()
        .innerRadius(radius * 0.4)
        .outerRadius(radius * 0.62);
      var arc4 = d3.svg
        .arc()
        .innerRadius(radius * 0.62)
        .outerRadius(radius * 1);
      var arc5 = d3.svg
        .arc()
        .innerRadius(radius * 0.4)
        .outerRadius(radius * 0.44);

      svg.attr(
        "transform",
        "translate(" + width / 2 + "," + height / 2 + ") rotate(-45)"
      );
      var key = function (d) {
        return d.data.label;
      };

      var colorQuarters = d3.scale
        .ordinal()
        .domain(this.domains.map((d) => d.name))
        .range(this.domains.map((d, i) => this.colorsOff0[i]));

      const domains = () => {
        var labels = colorQuarters.domain();
        return labels.map((label, i) => {
          return {
            label: label,
            value: 90,
            i,
            hidden: false,
            quadrant: i,
            id: this.domains[i].id,
          };
        });
      };
      var colorDomains = d3.scale
        .ordinal()
        .domain(this.domains.map((d) => d.name))
        .range(this.domains.map((d, i) => this.colorsOff0[i]));
      const domainsValues = () => {
        return this.domains.map((q, i) => {
          return { label: q.name, value: 100, id: q.id, quadrant: i };
        });
      };
      const splitTextInLines = (text, maxLine) => {
        if (!text) return ["", ""];
        let j = 0;
        let newText = "";
        for (let i = 0; i < text.length; i++) {
          const c = text[i];
          if (j >= maxLine && c === " ") {
            j = 1;
            newText += "^";
          } else {
            newText += c;
          }
          j++;
        }
        return newText.split("^");
      };

      var colorPrinciples = d3.scale
        .ordinal()
        .domain(
          this.principlesValues
            .filter((pv, i) => i % 2 === 0)
            .map((pv) => pv.label)
        )
        .range(
          this.principlesValues
            .filter((pv, i) => i % 2 === 0)
            .map((pv, i) => this.colorsOff1[pv.quadrant])
        );

      const principles = () => {
        var labels = colorPrinciples.domain();
        return labels.map((label, i) => {
          return {
            label: label,
            value: 60,
            i,
            id: this.principlesValues[i * 2].id,
            quadrant: this.principlesValues[i * 2].quadrant,
            description: this.principlesValues[i * 2].description,
            hidden: this.principlesValues[i * 2].hidden,
          };
        });
      };

      var colorPatterns = d3.scale
        .ordinal()
        .domain(
          this.patternsValues
            .filter((pv, i) => i % 2 === 0)
            .map((pv) => pv.label)
        )
        .range(
          this.patternsValues
            .filter((pv, i) => i % 2 === 0)
            .map((pv, i) => this.colorsOff1[pv.quadrant])
        );

      const patterns = () => {
        var labels = colorPatterns.domain();
        return labels.map((label, i) => {
          return {
            label: label,
            value: this.patternsValues[i * 2].value,
            i,
            description: this.patternsValues[i * 2].description,
            hidden: this.patternsValues[i * 2].hidden,
            quadrant: this.patternsValues[i * 2].quadrant,
            id: this.patternsValues[i * 2].id,
          };
        });
      };

      var slice2 = svg
        .select(".slices2")
        .selectAll("path.slice")
        .data(pie(domainsValues()), key);
      slice2
        .enter()
        .insert("path")
        .style("fill", function (d) {
          return colorDomains(d.data.label);
        })
        // .attr("class", "slice2")
        .attr("class", function (d) {
          return "slice-x slice2 slice2-q" + d.data.quadrant;
        })
        .attr("data-quadrant", function (d) {
          return d.data.quadrant;
        })
        .attr("data-fillhover", (d) => {
          return this.colorsOn0[d.data.quadrant];
        })
        .attr("data-type", "domain")
        .attr("data-id", function (d) {
          return d.data.id;
        });

      slice2
        .transition()
        .duration(1000)
        .attrTween("d", function (d) {
          this._current = this._current || d;
          var interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return function (t) {
            return arc2(interpolate(t));
          };
        });
      /* WHITE BORDERS */
      var slice3 = svg
        .select(".slices3")
        .selectAll("path.slice")
        .data(pie(domains()), key);
      slice3
        .enter()
        .insert("path")
        .style("fill", (d, i) => {
          return this.colorsOff[i % 2];
        })
        // .style("fill", this.colorsOff[2])
        .style("stroke-width", 3)
        .style("stroke", "#fff")
        .attr("class", "slice-x slice3")
        .attr("data-quadrant", function (d) {
          return d.data.quadrant;
        })
        .attr("data-fillhover", (d) => {
          return this.colorsOn0[d.data.quadrant];
        })
        .attr("data-type", "domain")
        .attr("data-id", function (d) {
          return d.data.id;
        });
      slice3
        .transition()
        .duration(1000)
        .attrTween("d", function (d) {
          this._current = this._current || d;
          var interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return function (t) {
            return arc(interpolate(t));
          };
        });

      /* PRINCIPLES */
      var slice4 = svg
        .select(".slices-principles")
        .selectAll("path.slice")
        .data(pie(principles()), key);
      slice4
        .enter()
        .insert("path")
        .style("fill", function (d) {
          return colorPrinciples(d.data.label);
        })
        .style("stroke-width", 3)
        .style("stroke", "#fff")
        .style("opacity", "0.6")
        .attr("class", "slice slice-x")
        .attr("data-type", "principle")
        .attr("data-quadrant", (d) => {
          return d.data.quadrant;
        })
        .attr("data-fillhover", (d) => {
          return this.colorsOn1[d.data.quadrant];
        })
        .attr("data-id", function (d) {
          return d.data.id;
        });
      slice4
        .transition()
        .duration(1000)
        .attrTween("d", function (d) {
          this._current = this._current || d;
          var interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return function (t) {
            return arc3(interpolate(t));
          };
        });
      slice4.exit().remove();

      var slice4v = svg
        .select(".slices-principles-values")
        .selectAll("path.slice")
        .data(pie(principles()), key);
      slice4v
        .enter()
        .insert("path")
        .style("fill", function (d) {
          return colorPrinciples(d.data.label);
        })
        .attr("data-type", "principle")
        .attr("data-quadrant", (d) => {
          return d.data.quadrant;
        })
        .attr("data-fillhover", (d) => {
          return this.colorsOn1[d.data.quadrant];
        })
        .attr("data-id", function (d) {
          return d.data.id;
        });

      slice4v
        .transition()
        .duration(1000)
        .attrTween("d", function (d) {
          this._current = this._current || d;
          var interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return function (t) {
            return arc5(interpolate(t));
          };
        });
      slice4v.exit().remove();

      /* PRINCIPLES BORDERS */
      var slice6 = svg
        .select(".slices-principles-border")
        .selectAll("path.slice")
        .data(pie(principles()), key);

      slice6
        .enter()
        .insert("path")
        .style("fill", "transparent")
        .style("stroke-width", 3)
        .style("stroke", "#fff")
        .attr("class", "slice slice-x")
        .attr("data-type", "principle")
        .attr("data-quadrant", (d) => {
          return d.data.quadrant;
        })
        .attr("data-fillhover", (d) => {
          return this.colorsOn1[d.data.quadrant];
        })
        .attr("data-id", function (d) {
          return d.data.id;
        })
        .attr("d", function (d) {
          return arc3(d);
        });

      slice6.exit().remove();

      /* PATTERNS */

      var slice5 = svg
        .select(".slices-patterns")
        .selectAll("path.slice")
        .data(pie(patterns()), key);
      slice5
        .enter()
        .insert("path")
        .style("fill", function (d) {
          return colorPatterns(d.data.label);
        })
        .style("stroke-width", 3)
        .style("stroke", "#fff")
        .style("opacity", "0.6")
        .attr("class", "slice slice-x")
        .attr("data-type", "pattern")
        .attr("data-quadrant", (d) => {
          return d.data.quadrant;
        })
        .attr("data-id", function (d) {
          return d.data.id;
        })
        .attr("data-fillhover", (d) => {
          return this.colorsOn1[d.data.quadrant];
        });
      slice5
        .transition()
        .duration(1000)
        .attrTween("d", function (d) {
          this._current = this._current || d;
          var interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return function (t) {
            return arc4(interpolate(t));
          };
        });
      slice5.exit().remove();

      /* ------- TEXT LABELS -------*/
      const midAngle = (d) => {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
      };
      var text = svg
        .select(".labels")
        .selectAll("text")
        .data(pie(domains()), key);

      text
        .enter()
        .append("text")
        .selectAll("tspan")
        .data(function (d) {
          return !d.data.hidden
            ? splitTextInLines(`0${d.data.i + 1} ${d.data.label}`, 1)
            : [""];
        })
        // .attr("text-anchor", "middle")

        .enter()
        .append("tspan")
        .text(function (d) {
          return d;
        })

        .attr("dy", "1.05em")
        .attr("x", "0")
        .style("font-family", "Athletics")
        .style("font-size", "18px")
        .style("font-weight", function (d, i) {
          return i === 0 ? "800" : "500";
        });

      var text2 = svg
        .select(".labels")
        .selectAll("text")
        .data(pie(domains()), key);

      text2
        .attr("transform", function (d) {
          var pos = arc.centroid(d);
          pos[0] = pos[0] * 1.24;
          pos[1] = pos[1] * 1.24;
          return (
            "translate(" + pos + ") rotate(" + (90 * (d.data.i + 1) - 45) + ")"
          );
        })
        .attr("text-anchor", "middle");
      text.exit().remove();

      var textp = svg
        .select(".labels-principles")
        .selectAll("text")
        .data(pie(principles()), key);

      textp
        .enter()
        .append("text")
        .selectAll("tspan")
        .data(function (d) {
          return d.data.description
            ? splitTextInLines(d.data.description, 10)
            : !d.data.hidden
            ? splitTextInLines(d.data.label || "", 10)
            : [""];
        })
        // .attr("text-anchor", "middle")

        .enter()
        .append("tspan")
        .text(function (d) {
          return d;
        })

        .attr("dy", "1.05em")
        .attr("x", "0")
        .style("font-family", "Athletics")
        .style("font-size", "13px")
        .style("font-weight", "400");

      var textp2p = svg
        .select(".labels-principles")
        .selectAll("text")
        .data(pie(principles()), key);

      textp2p
        .attr("transform", function (d) {
          var pos = arc3.centroid(d);
          pos[0] = pos[0] * 1.17;
          pos[1] = pos[1] * 1.17;
          return (
            "translate(" + pos + ") rotate(" + (30 * (d.data.i + 1) - 15) + ")"
          );
        })
        .attr("text-anchor", "middle");

      textp.exit().remove();

      var textpt = svg
        .select(".labels-patterns")
        .selectAll("text")
        .data(pie(patterns()), key);

      textpt
        .enter()
        .append("text")
        /*.selectAll("tspan")
        .data(function (d) {
          return d.data.description
            ? d.data.description
            : d.data.label;
        })

        .enter()
        .append("tspan")
        */
        .text(function (d) {
          return d.data.description;
        })

        .attr("dy", "0.3em")
        .attr("y", "0")
        .attr("x", "0")
        .style("font-family", "Athletics")
        .style("font-size", "11px")
        .style("font-weight", "400");

      var textpt2p = svg
        .select(".labels-patterns")
        .selectAll("text")
        .data(pie(patterns()), key);

      textpt2p
        .attr("transform", (d, i) => {
          var angle = this.patternsValues[i * 2].acc;
          var pos = arc4.centroid(d);
          pos[0] = pos[0] * 0.8;
          pos[1] = pos[1] * 0.8;
          return "translate(" + pos + ") rotate(" + (angle - 90 - 3) + ")";
        })
        .attr("text-anchor", "start");

      textpt.exit().remove();
    },
  },
};
</script>
<style lang="scss">
.svg-container {
  position: relative;
}
.svg-wheel-result {
  margin-top: 0rem;
  width: 100%;
  height: 100%;
}
.svg-wheel-result svg {
  width: 1000px;
  height: 1000px;
}
.slice2:hover {
  fill: "red" !important;
}
.slice2.slice2-q0:hover {
  fill: rgb(79, 75, 64) !important;
}
.svg-wheel-result text {
  pointer-events: none;
}
.svg-wheel-global {
  width: 120px;
  height: 120px;
  position: absolute;
  text-align: center;
  font-family: "Athletics";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>