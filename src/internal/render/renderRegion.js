
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/render/renderRegion.js
    Scrollgrid.prototype.internal.render.renderRegion = function (target, physicalOffset, xVirtual, yVirtual, clearCache) {

        var self = this,
            int = self.internal,
            render = int.render,
            interaction = int.interaction,
            sizes = int.sizes,
            virtual = sizes.virtual,
            dom = int.dom,
            cells,
            data;

        if ((xVirtual.left || 0) !== (xVirtual.right || 0) && (yVirtual.top || 0) !== (yVirtual.bottom || 0)) {

            data = render.getDataInBounds.call(self, {
                startX: physicalOffset.x || 0,
                startY: physicalOffset.y || 0,
                top: yVirtual.top || 0,
                bottom: yVirtual.bottom || 0,
                left: xVirtual.left || 0,
                right: xVirtual.right || 0
            });

            // On refresh we will clear and redraw everything.  This can
            // be invoked externally or internally on full grid changes.  On scroll or resize
            // we don't want to clear the cache because affected cells will be redrawn anyway
            if (clearCache) {
                target.content
                    .selectAll(".sg-no-style--cell-selector")
                    .remove();
            }

            cells = target.content
                .selectAll(".sg-no-style--cell-selector")
                .data(data, function (d) {
                    return d.key;
                });

            // We use the cell key to invoke an enter if the cell needs a render
            // for any reason, this means everything here happens on enter.
            cells.enter()
                .append("g")
                .attr("class", "sg-no-style--cell-selector")
                .each(function (d) {
                    var group = d3.select(this);
                    render.renderBackground.call(self, group, d);
                    render.renderForeground.call(self, group, d);
                    render.renderSortIcon.call(self, d, group, !(!d.sortIcon || d.sortIcon === 'none'));
                    // Add some interaction to the headers
                    if (target === dom.top || target === dom.top.left || target === dom.top.right) {
                        // Add sorting
                        if (interaction.allowSorting && d.rowIndex === virtual.top - 1) {
                            group.append("rect")
                                .attr("width", d.boxWidth)
                                .attr("height", d.boxHeight)
                                .style("opacity", 0)
                                .style("cursor", "pointer")
                                .on("click", function () { return interaction.sortColumn.call(self, d.columnIndex, true); });
                        }
                    }
                });

            cells.attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

            cells.exit()
                .remove();

        }
    };